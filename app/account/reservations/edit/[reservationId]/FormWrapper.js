"use client";
import SpinnerMini from "@/app/_components/SpinnerMini";
import { updateBookingAction } from "@/app/_lib/actions";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";
export default function FormWrapper({
	reservationId,
	maxCapacity,
	observations,
	numGuests,
}) {
	let router = useRouter();
	const formRef = useRef(null);
	const handleAction = async (formData) => {
		const result = await updateBookingAction(formData);
		if (result?.error) {
			toast.error(`Something went wrong:${result.error}`);
		} else {
			toast.success("Successfully updated");
			// formRef.current?.reset(); // optional
			router.push("/account/reservations");
		}
	};
	return (
		<div>
			<h2 className="font-semibold text-2xl text-accent-400 mb-7">
				Edit Reservation #{reservationId}
			</h2>

			<form
				className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
				action={handleAction}
				ref={formRef}
			>
				<input type="hidden" name="id" value={reservationId} />
				<div className="space-y-2">
					<label htmlFor="numGuests">How many guests?</label>
					<select
						name="numGuests"
						id="numGuests"
						className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
						required
						defaultValue={numGuests}
					>
						<option value="" key="">
							Select number of guests...
						</option>
						{Array.from({ length: maxCapacity }, (_, i) => i + 1).map(
							(x) => (
								<option value={x} key={x}>
									{x} {x === 1 ? "guest" : "guests"}
								</option>
							)
						)}
					</select>
				</div>

				<div className="space-y-2">
					<label htmlFor="observations">
						Anything we should know about your stay?
					</label>
					<textarea
						name="observations"
						className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
						defaultValue={observations}
					/>
				</div>

				<div className="flex justify-end items-center gap-6">
					<ReservationButton />
				</div>
			</form>
		</div>
	);
}
function ReservationButton() {
	const { pending } = useFormStatus();
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
