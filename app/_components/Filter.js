import { useSearchParams } from "next/navigation";

export default function Filter({ filterOptions, setFilter, filterField }) {
	const searchParams = useSearchParams();
	const activeFilter =
		searchParams.get(filterField) ?? filterOptions.at(0).value;
	return (
		<ul className="flex items-center mb-4 border-primary-800 border-1 border">
			{filterOptions.map((filterOption) => (
				<li key={filterOption.value}>
					<button
						className={`py-2 px-4 hover:bg-primary-700 transition-all ${
							filterOption.value === activeFilter ? "bg-primary-700" : ""
						}`}
						onClick={() => setFilter(filterOption.value)}
					>
						{filterOption.label}
					</button>
				</li>
			))}
		</ul>
	);
}
