"use client";
import { useState, FormEvent } from "react";
import { Form, Input, Button, Alert } from "@nextui-org/react";
import { useAuthStore } from "@/app/store/authStore";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/app/utils/api";
import { AuthData } from "@/app/types/auth";
import { Link } from "@/i18n/routing";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Errors } from "@/app/types/errors";
import { useTranslations } from "next-intl";
import { OAuthButtons } from "@/app/components/OAuthButtons";

interface LoginForm {
	email: string;
	password: string;
}

export default function App() {
	const [password, setPassword] = useState<string>("");
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

	const [errors, setErrors] = useState<Errors>({});

	const t = useTranslations("LoginRegisterPage");

	const setAuthStorage = useAuthStore((state) => state.setAuthStorage);
	const authStorage = useAuthStore((state) => state.authStorage);

	// Real-time password validation
	const getPasswordError = (value: string) => {
		if (value.length > 0 && value.length < 4) {
			return t("PASSWORD_SHORT");
		}
		if (value.length > 0 && (value.match(/[A-Z]/g) || []).length < 1) {
			return t("PASSWORD_NO_UPPERCASE");
		}

		return null;
	};

	const login = async (form: LoginForm) => {
		const data: AuthData = await apiRequest("/auth/jwt/login", {
			method: "POST",
			body: new URLSearchParams({
				username: form.email,
				password: form.password,
			}),
		});

		if (!data.access_token) {
			throw new Error("NO_TOKEN");
		}

		return data;
	};

	const loginMutation = useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			setAuthStorage({ access_token: data.access_token, login_invisible: false });
		},
		onError: (error: Error) => {
			setErrors({ form: error.message });
		},
	});

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		// Custom validation checks
		const newErrors: Errors = {};

		// Password validation
		const passwordError = getPasswordError(password);

		if (passwordError) {
			newErrors.password = passwordError;
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);

			return;
		}

		setErrors({});
		if (email && password) {
			loginMutation.mutate({ email, password });
		} else {
			setErrors({ form: t("FILL_ALL_FIELDS") });
		}
	};

	// const handleReset = () => {
	// 	setErrors({});
	// };

	const isLoading = loginMutation.isPending || !!authStorage.access_token;

	return (
		<Form
			className="w-full min-h-[calc(100vh-64px)] justify-center items-center space-y-4"
			validationBehavior="native"
			validationErrors={errors}
			onSubmit={onSubmit}
		>
			<div className="flex flex-col gap-4 w-4/5 md:w-80">
				<h1 className="text-3xl text-center mb-5">{t("login_title")}</h1>
				<AnimatePresence>
					{errors?.form && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
						>
							<Alert
								color={"danger"}
								title={t(errors?.form as keyof IntlMessages["LoginRegisterPage"])}
							/>
						</motion.div>
					)}
				</AnimatePresence>
				<Input
					isRequired
					isDisabled={isLoading}
					errorMessage={({ validationDetails }) => {
						if (validationDetails.valueMissing) {
							return t("EMAIL_MISSING");
						}
						if (validationDetails.typeMismatch) {
							return t("EMAIL_INVALID");
						}
					}}
					label={t("email_label")}
					labelPlacement="outside"
					name="email"
					placeholder={t("email_placeholder")}
					type="email"
				/>

				<Input
					isRequired
					isDisabled={isLoading}
					errorMessage={getPasswordError(password)}
					isInvalid={getPasswordError(password) !== null}
					label={t("password_label")}
					labelPlacement="outside"
					name="password"
					placeholder={t("password_placeholder")}
					type={isPasswordVisible ? "text" : "password"}
					value={password}
					onValueChange={setPassword}
					endContent={
						<Button
							isIconOnly
							variant="light"
							radius="full"
							size="sm"
							onPress={() => {
								togglePasswordVisibility();
							}}
						>
							{isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
						</Button>
					}
				/>

				<div className="flex gap-4 mt-2">
					<Button
						isLoading={isLoading}
						className="w-full"
						color="primary"
						variant="ghost"
						type="submit"
					>
						{t("submit_button")}
					</Button>
					{/* <Button
						isDisabled={isLoading}
						onPress={() => {
							handleReset();
						}}
						type="reset"
						variant="bordered"
					>
						{t("reset_button")}
					</Button> */}
				</div>
				<div className="flex items-end justify-center mt-10 w-full">
					<Link href="/register" className="w-full">
						<Button className="w-full" variant="flat" color="primary">
							{t("register_button")}
						</Button>
					</Link>
				</div>
				<OAuthButtons />
			</div>
		</Form>
	);
}
