// "@" represents root dir.
import "@/app/_styles/globals.css";
import Header from "@/app/_components/Header";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
	subsets: ["latin"],
	display: "swap",
});

export const metadata = {
	title: {
		// %s stands for what you export from any page. If don't, then it'll be default value
		template: "%s | Wild Oasis",
		default: "Welcome to Wild Oasis",
	},
	description: "rent hotels easily",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`flex flex-col gap-6 min-h-screen bg-primary-950 text-primary-100 ${josefin.className}`}
			>
				<Header />
				<div className="flex-1">
					<main className="max-w-7xl mx-auto">{children}</main>
				</div>
			</body>
		</html>
	);
}
