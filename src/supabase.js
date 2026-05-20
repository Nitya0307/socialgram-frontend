import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://tvlwwkhxnnweyekdksdt.supabase.co";

const supabaseKey =
  "sb_publishable_6sBdnI4I5WGpyeGls4lV7w_UmT3Hn7y";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);