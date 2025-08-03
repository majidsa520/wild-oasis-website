import { signInAction } from "../_lib/actions";

export default function SignInButton() {
	// since this is a server component we cannot use events like onClick, etc
	// so we need server actions to handle the sign in process
	return (
		<form action={signInAction}>
			<button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
				<img
					src="https://authjs.dev/img/providers/google.svg"
					alt="Google logo"
					height="24"
					width="24"
				/>
				<span>Continue with Google</span>
			</button>
		</form>
	);
}
