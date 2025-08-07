"use client";
import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
export default function ReservationList({ bookings }) {
	const [optimisticBookings, optimisticDelete] = useOptimistic(
		bookings,
		(curBookings, deletedBookingId) =>
			curBookings.filter((booking) => booking.id !== deletedBookingId)
	);
	return (
		<ul className="space-y-6">
			{optimisticBookings.map((booking) => (
				<ReservationCard
					booking={booking}
					key={booking.id}
					optimisticDelete={optimisticDelete}
				/>
			))}
		</ul>
	);
}
