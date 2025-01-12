"use client";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
	Link,
	Avatar,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
	Spinner,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { FaMap, FaStore, FaTrophy, FaSignOutAlt, FaUserAlt, FaRadiation } from "react-icons/fa";
import { useRouter, usePathname } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { useAuthStore } from "@/app/store/authStore";
import { apiRequest } from "@/app/utils/api";
import { useMutation } from "@tanstack/react-query";
import { useUserInfo } from "../hooks/useUserInfo";

interface MenuItem {
	name: string;
	link: string;
	icon: React.JSX.Element;
	isActive?: boolean;
	isDisabled?: boolean;
}

export default function MainNavbar() {
	const locale = useLocale();
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const t = useTranslations("Navbar");

	const router = useRouter();
	const pathname = usePathname();

	// const user = useUserStore((state) => state.user);
	// const setUser = useUserStore((state) => state.setUser);
	const { authStorage, setAuthStorage } = useAuthStore();

	const iconStyle = "ml-1.5 hidden lg:inline";

	const menuItems: MenuItem[] = [
		{
			name: t("character"),
			link: "/character",
			icon: <FaUserAlt className={iconStyle} />,
			isActive: true,
		},
		{ name: t("map"), link: "/map", icon: <FaMap className={iconStyle} /> },
		{
			name: t("trade"),
			link: "/shop",
			icon: <FaStore className={iconStyle} />,
		},
		{
			name: t("leaderboard"),
			link: "/leaderboard",
			icon: <FaTrophy className={iconStyle} />,
		},
		// {
		//   name: "Чат",
		//   link: "/chat",
		//   icon: <FaComments className={iconStyle} />,
		//   isDisabled: true,
		// },
	];

	const handleMenuOpenChange = (isOpen: boolean) => {
		setIsMenuOpen(isOpen);
	};

	const handleChangeLanguage = (locale: string) => {
		router.replace({ pathname }, { locale: locale });
	};

	const logout = async () => {
		return apiRequest("/auth/jwt/logout", {
			method: "POST",
		});
	};

	const logoutMutation = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			setAuthStorage({ access_token: undefined, login_invisible: false });
			// setUser(null);
			router.push("/");
		},
		onError: (error) => {
			console.error("Logout failed", error);
		},
	});

	const handleLogOut = () => {
		logoutMutation.mutate();
	};

	const { user, isUserLoading } = useUserInfo();

	useEffect(() => {
		if (user && (pathname === "/login" || pathname === "/register")) {
			router.push("/character");
		}
	}, [user, pathname, router]);

	return (
		<>
			<Navbar onMenuOpenChange={handleMenuOpenChange} isMenuOpen={isMenuOpen} maxWidth="2xl">
				<NavbarContent>
					<NavbarMenuToggle
						aria-label={isMenuOpen ? "Close menu" : "Open menu"}
						className="md:hidden text-white"
					/>
					<li>
						<Link
							color="foreground"
							className="cursor-pointer"
							onPress={() => {
								router.push("/");
							}}
						>
							<NavbarBrand className="text-2xl text-primary-400 flex gap-1.5">
								<FaRadiation className="mr-3" />
								<p className={`font-bold text-inherit hidden xs:inline`}>Cryptic</p>
								<p className={`font-bold text-inherit hidden md:inline`}>Project</p>
							</NavbarBrand>
						</Link>
					</li>
				</NavbarContent>

				<NavbarContent className="hidden md:flex gap-3" justify="center">
					{menuItems.map((item, index) => {
						const isActive = pathname === item.link;
						return (
							<NavbarItem key={index}>
								<Link
									color={isActive ? "primary" : "foreground"}
									className="nav-link pb-1.5 px-2.5 cursor-pointer"
									isBlock
									isDisabled={item.isDisabled || !user} //  || !loggedIn
									anchorIcon={item.icon}
									showAnchorIcon={true}
									onPress={() => {
										router.push(item.link);
									}}
								>
									{item.name}
								</Link>
							</NavbarItem>
						);
					})}
				</NavbarContent>
				<NavbarContent justify="end">
					<NavbarItem>
						<div className="flex items-center gap-x-4">
							{isUserLoading ? (
								<Spinner color="primary" size="sm" />
							) : authStorage.access_token == undefined && authStorage.login_invisible === false ? (
								<>
									<Button
										radius="full"
										color="default"
										aria-label={t("login_button")}
										endContent={<FaSignOutAlt />}
										onPress={() => {
											router.push("/login");
										}}
									>
										{t("login_button")}
									</Button>
									{locale === "ru" ? (
										<Button
											isIconOnly
											aria-label="Like"
											radius="full"
											variant="light"
											onPress={() => handleChangeLanguage("en")}
										>
											EN
										</Button>
									) : (
										<Button
											isIconOnly
											aria-label="Like"
											radius="full"
											variant="light"
											onPress={() => handleChangeLanguage("ru")}
										>
											RU
										</Button>
									)}
								</>
							) : user ? (
								<Dropdown backdrop="opaque" placement="bottom-start">
									<DropdownTrigger>
										<Avatar
											showFallback
											radius="full"
											className="text-primary-400 cursor-pointer"
										/>
									</DropdownTrigger>
									<DropdownMenu aria-label="User Actions" variant="flat">
										<DropdownItem key="profile" className="h-14 gap-2">
											<p className="font-bold">{user.email}</p>
										</DropdownItem>
										{locale === "ru" ? (
											<DropdownItem
												onPress={() => handleChangeLanguage("en")}
												key="change_language_to_en"
											>
												{t("language_button")}: RU
											</DropdownItem>
										) : (
											<DropdownItem
												onPress={() => handleChangeLanguage("ru")}
												key="change_language_to_ru"
											>
												{t("language_button")}: EN
											</DropdownItem>
										)}
										<DropdownItem onPress={() => handleLogOut()} key="logout" color="danger">
											{t("logout_button")}
										</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							) : null}
						</div>
					</NavbarItem>
				</NavbarContent>
				<NavbarMenu>
					{menuItems.map((item, index) => {
						const isActive = pathname === item.link;
						return (
							<NavbarMenuItem key={`${item}-${index}`}>
								<Link
									color={isActive ? "primary" : "foreground"}
									className="nav-link w-full cursor-pointer text-xl"
									isDisabled={item.isDisabled || !user}
									anchorIcon={item.icon}
									showAnchorIcon={true}
									onPress={() => {
										handleMenuOpenChange(false);
										router.push(item.link);
									}}
								>
									{item.name}
								</Link>
							</NavbarMenuItem>
						);
					})}
				</NavbarMenu>
			</Navbar>
		</>
	);
}
