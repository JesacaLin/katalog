import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xmbmbdtgbybujizevhyc.supabase.co";
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
//const bearerToken = process.env.REACT_APP_BEARER_TOKEN;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
