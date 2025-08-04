import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
	providers: [
		Google({
			clientId: process.env.GOOGLE_AUTH_ID,
			clientSecret: process.env.GOOGLE_AUTH_CLIENT,
		}),
	],
	callbacks: {
		//authorize user
		authorized({ auth, request }) {
			return !!auth?.user;
		},
		async signIn({ user, account, profile }) {
			console.log(user);
			// after the user puts in creds and before actuall sign in to site
			try {
				const guest = await getGuest({ email: user.email });
				if (!guest?.id)
					await createGuest({ email: user.email, fullName: user.name });
				return true;
			} catch {
				return false;
			}
		},
		async session({ session, user }) {
			// runs after signIn() and provides session
			const { id: guestId } = await getGuest({ email: session.user.email });
			session.user.guestId = guestId;
			return session;
		},
	},
	pages: {
		// signIn: "/login", // signin requests will be redirected to /login
	},
};
export const {
	auth,
	signIn,
	signOut,
	handlers: { GET, POST },
} = NextAuth(authConfig);
