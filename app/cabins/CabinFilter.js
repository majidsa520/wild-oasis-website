"use client";
import Filter from "@/app/_components/Filter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const filterOptions = [
	{ value: "all", label: "All cabins" },
	{ value: "small", label: "1-3 guests" },
	{ value: "medium", label: "4-7 guests" },
	{ value: "large", label: "8-12 guests" },
];
const filterField = "capacity";
export default function CabinFilter() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	function setFilter(value) {
		const params = new URLSearchParams(searchParams);
		params.set(filterField, value);
		router.replace(`${pathname}?${params}`, { scroll: false });
	}
	return (
		<div className="flex justify-end">
			<Filter
				filterOptions={filterOptions}
				setFilter={setFilter}
				filterField={filterField}
			/>
		</div>
	);
}
