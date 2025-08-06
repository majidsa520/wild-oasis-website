"use client";

import SpinnerMini from "@/app/_components/SpinnerMini";
import { useFormStatus } from "react-dom";

export default function ReservationButton() {
	const { pending, data } = useFormStatus();
	console.log(data, "-------------------------");
	return (
		<button
			className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 flex gap-2 items-center justify-center"
			disabled={pending}
		>
			{!pending ? (
				<span className="mt-1">Update reservation</span>
			) : (
				<>
					<SpinnerMini />
					<span className="mt-1">Updating</span>
				</>
			)}
		</button>
	);
}
