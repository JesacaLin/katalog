// import { API_KEY, BEARER_TOKEN } from "./config";
import { API_KEY } from "./config";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xmbmbdtgbybujizevhyc.supabase.co";
const supabaseKey = API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
