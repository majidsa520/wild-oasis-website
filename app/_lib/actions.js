"use server";
import { auth, signIn, signOut } from "./auth";
import { AuthError } from "next-auth";
import { updateGuest } from "./data-service";
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
