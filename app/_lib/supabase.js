import { createClient } from "@supabase/supabase-js";
console.log("test");
export const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_KEY
);
