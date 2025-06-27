import SideNavigation from "@/app/_components/SideNavigation";

export default function RootLayout({ children }) {
	return (
		<div className="grid grid-cols-[16rem_1fr] gap-4 w-full">
			<SideNavigation />
			<div className="w-full py-1">{children}</div>
		</div>
	);
}
