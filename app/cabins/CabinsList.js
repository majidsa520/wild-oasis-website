"use client";
import CabinCard from "@/app/_components/CabinCard";
import { useSearchParams } from "next/navigation";
import CabinFilter from "./CabinFilter";

export default function CabinsList({ cabins }) {
	const filter = useSearchParams().get("capacity") ?? "all";
	let filteredCabins;
	switch (filter) {
		case "small":
			filteredCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
			break;
		case "medium":
			filteredCabins = cabins.filter(
				(cabin) => 3 < cabin.maxCapacity && cabin.maxCapacity < 8
			);
			break;
		case "large":
			filteredCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
			break;
		case "all":
			filteredCabins = cabins;
			break;
		default:
			filteredCabins = cabins;
	}
	return (
		<div className="flex flex-col ">
			<CabinFilter />
			{cabins.length > 0 && (
				<div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
					{filteredCabins.map((cabin) => (
						<CabinCard cabin={cabin} key={cabin.id} />
					))}
				</div>
			)}
		</div>
	);
}
