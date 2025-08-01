import Link from "next/link";
import { auth } from "@/app/_lib/auth";

export default async function Navigation() {
	const { user } = (await auth()) ?? {};
	return (
		<nav className="z-10 text-xl">
			<ul className="flex gap-16 items-center">
				<li>
					<Link
						href="/cabins"
						className="hover:text-accent-400 transition-colors"
					>
						Cabins
					</Link>
				</li>
				<li>
					<Link
						href="/about"
						className="hover:text-accent-400 transition-colors"
					>
						About
					</Link>
				</li>
				<li>
					{user?.name ? (
						<Link
							href="/account"
							className="hover:text-accent-400 transition-colors flex items-center gap-4 flex-row-reverse"
						>
							<img
								src={user?.image}
								fill
								className="object-cover size-8 rounded-full"
								alt="profile image"
								referrerPolicy="no-referrer" //sometimes is necessary for displaying images from google
							/>
							<span>{user?.name}</span>
						</Link>
					) : (
						<Link
							href="/account"
							className="hover:text-accent-400 transition-colors"
						>
							Guest Area
						</Link>
					)}
				</li>
			</ul>
		</nav>
	);
}
