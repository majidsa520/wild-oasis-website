"use client";
import SpinnerMini from "@/app/_components/SpinnerMini";
import { deleteBookingAction } from "@/app/_lib/actions";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";

export default function DeleteReservation({ bookingId, optimisticDelete }) {
	const [pending, setTransition] = useTransition();
	function handleDelete() {
		if (confirm("Are you sure about deleting this booking?")) {
			optimisticDelete(bookingId);
			// setTransition(() => deleteBookingAction(bookingId));
			// since we're using optimisticDelete, no need to use transition and show spinnig indicator
			deleteBookingAction(bookingId);
		}
	}
	return (
		<button
			className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 px-3 hover:bg-accent-600 transition-colors hover:text-primary-900 my-auto w-full flex-grow"
			onClick={handleDelete}
			disabled={pending}
		>
			{!pending ? (
				<>
					<TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
					<span className="mt-1">Delete</span>
				</>
			) : (
				<>
					<SpinnerMini />
					<span className="mt-1">Deleting</span>
				</>
			)}
		</button>
	);
}
