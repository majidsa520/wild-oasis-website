import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const authConfig = {
	providers: [
		Google({
			clientId: process.env.GOOGLE_AUTH_ID,
			clientSecret: process.env.GOOGLE_AUTH_CLIENT,
		}),
	],
	callbacks: {
		authorized({ auth, request }) {
			return !!auth?.user;
		},
	},
};
export const {
	auth,
	handlers: { GET, POST },
} = NextAuth(authConfig);
