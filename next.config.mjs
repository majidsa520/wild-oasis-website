/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "ohxvrgskowfwbbgwjlvo.supabase.co",
				port: "",
				pathname: "/storage/v1/object/public/cabin-images/**",
				search: "",
			},
		],
	},
	// distDir: "@/out",
};
// https://ohxvrgskowfwbbgwjlvo.supabase.co/storage/v1/object/public/cabin-images/0.7254143805733573-Golden_buddha.jpg
export default nextConfig;
