import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
	const { name } = await getCabin(params.cabinId);
	return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
	const cabins = await getCabins();
	const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
	return ids;
}

export default async function Page({ params }) {
	// ** fetch 1 after another **
	// const cabin = await getCabin(params.cabinId);
	// const settings = await getSettings();
	// const bookedDates = await getBookedDatesByCabinId(params.cabinId);

	// ** fetch all data at once **
	// const [cabin, settings, bookedDates] = Promise.all([
	// 	getCabin(params.cabinId),
	// 	getSettings(),
	// 	getBookedDatesByCabinId(params.cabinId),
	// ]);
	const cabin = await getCabin(params.cabinId);

	return (
		<div className="max-w-6xl mx-auto mt-8 pb-12">
			<Cabin cabin={cabin} />
			<div>
				<h2 className="text-5xl font-semibold text-center text-accent-400 mb-10">
					Reserve {cabin.name} today. Pay on arrival.
				</h2>
			</div>
			<Suspense fallback={<Spinner />}>
				<Reservation cabin={cabin} />
			</Suspense>
		</div>
	);
}
