import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";

export default async function CabinsList() {
	const cabins = await getCabins();
	// to deliberately add 4sec timeout to see what's heppening:
	// await new Promise((resolve) => setTimeout(resolve, 4000));
	return (
		cabins.length > 0 && (
			<div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
				{cabins.map((cabin) => (
					<CabinCard cabin={cabin} key={cabin.id} />
				))}
			</div>
		)
	);
}
