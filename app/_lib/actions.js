"use server";
import { z } from "zod";
import { auth, signIn, signOut } from "./auth";
// import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import {
	deleteBooking,
	getBooking,
	getBookings,
	getCabin,
	getSettings,
	updateBooking,
	updateGuest,
} from "./data-service";
import { supabase } from "./supabase";
export async function signInAction() {
	// we can get providers from auth url dynamically (/api/auth/providers)
	try {
		await signIn("google", { redirectTo: "/account" });
	} catch (err) {
		// if (err instanceof AuthError) console.log("true");
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
export async function createBookingAction(formData, formPasiveData) {
	// getting data from database
	const session = await auth();
	const guestId = session?.user?.guestId || null;
	if (!guestId) throw new Error("You must login first");
	const data = {
		...formPasiveData,
		...Object.fromEntries(formData.entries()),
		guestId,
	};
	const [cabin, settings] = await Promise.all([
		getCabin(data.cabinId),
		getSettings(),
	]);

	// defining form schema
	const formSchema = z.object({
		guestId: z.coerce.number().int().min(1),
		numNights: z.coerce
			.number()
			.int()
			.min(settings.minBookingLength)
			.max(settings.maxBookingLength),
		numGuests: z.coerce.number().int().min(1),
		cabinPrice: z.coerce.number().min(0),
		extrasPrice: z.coerce.number().min(0),
		totalPrice: z.coerce.number().min(0),
		status: z.union([
			z.literal("checked-in"),
			z.literal("checked-out"),
			z.literal("unconfirmed"),
		]),
		hasBreakfast: z.boolean(),
		isPaid: z.boolean(),
		observations: z.string(),
		cabinId: z.number(),
	});
	// validating data
	const parsedData = formSchema.safeParse(data);
	console.log(parsedData);
	if (!parsedData.success) throw new Error("data mismatch");
	if (
		!parsedData.cabinPrice ===
		parsedData.numNight * (cabin.regularPrice - cabin.discount)
	)
		throw new Error("data mismatch");

	const response = await supabase
		.from("bookings")
		.insert([data])
		// So that the newly created object gets returned!
		.select()
		.single();
	revalidatePath(`/cabins/${cabin.id}`);
	return response;
}
