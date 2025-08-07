import { getBooking, getCabin, getSettings } from "@/app/_lib/data-service";
import FormWrapper from "./FormWrapper";
export const metadata = { title: "Edit reservation" };
export default async function Page({ params }) {
	const { reservationId } = params;
	const { observations, numGuests, cabinId } = await getBooking(reservationId);
	const { maxCapacity } = await getCabin(cabinId);
	return (
		<FormWrapper
			reservationId={reservationId}
			maxCapacity={maxCapacity}
			observations={observations}
			numGuests={numGuests}
		/>
	);
}
