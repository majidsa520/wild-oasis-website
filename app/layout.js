import Logo from "./components/Logo";
import Navigation from "./components/Navigation";

export const metadata = {
	title: "Wild Oasis",
	description: "rent hotels easily",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
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
