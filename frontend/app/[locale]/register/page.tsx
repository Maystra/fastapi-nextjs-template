"use client";
import { useState, FormEvent } from "react";
import { Form, Input, Button, Alert } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/app/utils/api";
import { AuthData } from "@/app/types/auth";
import { useRouter } from "@/i18n/routing";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Errors } from "@/app/types/errors";
import { useTranslations } from "next-intl";
import { OAuthButtons } from "@/app/components/OAuthButtons";

interface RegistrationForm {
	email: string;
	username: string;
	password: string;
}

export default function App() {
	const [password, setPassword] = useState("");
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

	const t = useTranslations("LoginRegisterPage");

	const [username, setUsername] = useState("");
	const [errors, setErrors] = useState<Errors>({});

	const router = useRouter();

	const getPasswordError = (value: string) => {
		if (value.length > 0 && value.length < 4) {
			return t("PASSWORD_SHORT");
		}
		if (value.length > 0 && (value.match(/[A-Z]/g) || []).length < 1) {
			return t("PASSWORD_NO_UPPERCASE");
		}

		return null;
	};

	const getUsernameError = (value: string) => {
		if (value.length > 0 && (value.length < 3 || value.length > 16)) {
			return t("USERNAME_INCORRECT");
		}

		return null;
	};

	const register = async (form: RegistrationForm) => {
		const data: AuthData = await apiRequest("/auth/register", {
			method: "POST",
			body: JSON.stringify({
				email: form.email,
				username: form.username,
				password: form.password,
			}),
		});

		return data;
	};

	const registerMutation = useMutation({
		mutationFn: register,
		onSuccess: () => {
			setIsSuccess(true);
			setTimeout(() => {
				router.push("/login");
			}, 1000);
		},
		onError: (error: Error) => {
			setErrors({ form: error.message });
		},
	});

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const username = formData.get("username") as string;
		const password = formData.get("password") as string;

		// Custom validation checks
		const newErrors: Errors = {};

		// Password validation
		const passwordError = getPasswordError(password);

		if (passwordError) {
			newErrors.password = passwordError;
		}

		// Username validation
		const usernameError = getUsernameError(username);

		if (usernameError) {
			newErrors.username = usernameError;
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);

			return;
		}

		setErrors({});
		if (email && password) {
			registerMutation.mutate({ email, username, password });
		} else {
			setErrors({ form: t("FILL_ALL_FIELDS") });
		}
	};

	// const handleReset = () => {
	// 	setErrors({});
	// };

	const isLoading = registerMutation.isPending || isSuccess;

	return (
		<Form
			className="w-full min-h-[calc(100vh-64px)] justify-center items-center space-y-4"
			validationBehavior="native"
			validationErrors={errors}
			onSubmit={onSubmit}
		>
			<div className="flex flex-col gap-4 w-4/5 md:w-80">
				<h1 className="text-3xl text-center mb-5">{t("register_title")}</h1>
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
				<AnimatePresence>
					{isSuccess && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
						>
							<Alert color={"success"} title={t("REGISTER_SUCCESS")} />
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
					errorMessage={getUsernameError(username)}
					isInvalid={getUsernameError(username) !== null}
					label={t("username_label")}
					labelPlacement="outside"
					name="username"
					placeholder={t("username_placeholder")}
					type="text"
					value={username}
					onValueChange={setUsername}
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

				<div className="flex gap-4 mt-3">
					<Button
						isLoading={isLoading}
						className="w-full"
						color="primary"
						variant="ghost"
						type="submit"
					>
						{t("register_button")}
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
				<OAuthButtons />
			</div>
		</Form>
	);
}
