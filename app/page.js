export default async function Page() {
	const users = await (
		await fetch("https://jsonplaceholder.typicode.com/users")
	).json();
	return (
		<div>
			<h1>Welcome to wild oasis</h1>
			<ul>
				{users.map((user) => (
					<li key={user.id}>{`${user.username}: ${user.name}`}</li>
				))}
			</ul>
		</div>
	);
}
