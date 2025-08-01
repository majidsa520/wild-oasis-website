import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
	console.log(cabinId);
	const { cabinId } = params;
	try {
		const [cabin, bookedDates] = await Promise.all([
			getCabin(cabinId),
			getBookedDatesByCabinId(cabinId),
		]);
		console.log(cabin);
		return Response.json({ cabin, bookedDates });
	} catch (err) {
		throw new Error(err.message);
	}
}
