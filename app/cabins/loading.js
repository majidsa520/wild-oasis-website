import Spinner from "@/app/_components/Spinner";

export default function Loading() {
	return (
		<div className="flex flex-col items-center">
			<Spinner />
			<h3>Loading Cabin Data...</h3>
		</div>
	);
}
