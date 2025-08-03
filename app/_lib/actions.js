"use server";
import { signIn, signOut } from "./auth";
import { AuthError } from "next-auth";
export async function signInAction() {
	// we can get providers from auth url dynamically (/api/auth/providers)
	try {
		await signIn("google", { redirectTo: "/account" });
		console.log("-----------------------------");
	} catch (err) {
		if (err instanceof AuthError) console.log("true");
	}
}
export async function signOutAction() {
	await signOut({ redirectTo: "/" });
}
