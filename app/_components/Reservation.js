import { getSettings, getBookedDatesByCabinId } from "@/app/_lib/data-service";
import ReservationForm from "@/app/_components/ReservationForm";
import LoginMessage from "@/app/_components/LoginMessage";
import DateSelector from "@/app/_components/DateSelector";
import { auth } from "../_lib/auth";

export default async function Reservation({ cabin }) {
	const [settings, bookedDates, session] = await Promise.all([
		getSettings(),
		getBookedDatesByCabinId(cabin.id),
		auth(),
	]);

	return (
		<div className="grid grid-cols-2 min-h-[400px] border border-primary-800 p-4 gap-8">
			<DateSelector
				settings={settings}
				bookedDates={bookedDates}
				cabin={cabin}
			/>
			{session?.user ? (
				<ReservationForm cabin={cabin} user={session.user} />
			) : (
				<LoginMessage />
			)}
		</div>
	);
}
