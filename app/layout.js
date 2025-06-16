import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation"; // "@" represents root dir.

import { Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({
	subsets: ["latin"],
	display: "swap",
});
console.log(josefin);

export const metadata = {
	title: {
		// %s stands for what you export from any page. If don't then it'll be default value
		template: "%s | Wild Oasis",
		default: "Welcome to Wild Oasis",
	},
	description: "rent hotels easily",
};
import "@/app/_styles/globals.css";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`min-h-screen bg-primary-950 text-primary-100 ${josefin.className}`}
			>
				<header>
					<Logo />
					<Navigation />
				</header>
				<main>{children}</main>
				<footer>
					<h4>copy rights reserved</h4>
				</footer>
			</body>
		</html>
	);
}
