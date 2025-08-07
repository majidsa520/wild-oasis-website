"use server";
import { auth, signIn, signOut } from "./auth";
import { AuthError } from "next-auth";
import {
	deleteBooking,
	getBooking,
	getBookings,
	updateBooking,
	updateGuest,
} from "./data-service";
import { revalidatePath } from "next/cache";
export async function signInAction() {
	// we can get providers from auth url dynamically (/api/auth/providers)
	try {
		await signIn("google", { redirectTo: "/account" });
		console.log("-----------------------------");
	} catch (err) {
		if (err instanceof AuthError) console.log("true");
		throw err;
	}
}
export async function signOutAction() {
	await signOut({ redirectTo: "/" });
}
export async function updateGuestAction(formData) {
	const {
		user: { guestId },
	} = await auth();
	if (!guestId) throw new Error("You are not logged in!");
	//const dataToUpdate = Object.fromEntries(formData);

	const nationalID = formData.get("nationalID");
	if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
		throw new Error(
			"national id must be at least 6 and at most 12 characters without any special characters like % or $"
		);
	}

	const [nationality, countryFlag] = formData.get("nationality").split("%");

	const dataToUpdate = { nationalID, nationality, countryFlag };

	const data = await updateGuest(guestId, dataToUpdate);

	revalidatePath("/account/profile");
}
export async function deleteBookingAction(bookingId) {
	const {
		user: { guestId },
	} = await auth();
	const guestBookings = await getBookings(guestId);
	const guestBookingsIds = guestBookings.map((booking) => booking.id);
	if (!guestBookingsIds.includes(bookingId))
		throw new Error("You don't have permission to do this.");
	const data = await deleteBooking(bookingId);
	revalidatePath("/account/reservation");
	return data;
}
export async function updateBookingAction(formData) {
	const {
		user: { guestId },
	} = (await auth()) || {};
	if (!guestId) throw new Error("You must login first");
	const observations = formData.get("observations").slice(0, 1000);
	const numGuests = formData.get("numGuests");
	if (numGuests < 1) throw new Error("Number of guest cannot be 0");
	const reservationId = Number(formData.get("id"));
	const booking = await getBooking(reservationId);
	if (booking.guestId !== guestId)
		throw new Error("You don't have permission to do this.");
	const result = await updateBooking(reservationId, {
		numGuests,
		observations,
	});
	//revalidatePath("/account/reservation");
	return result;
}
