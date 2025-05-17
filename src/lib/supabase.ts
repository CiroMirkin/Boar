import { createClient } from "@supabase/supabase-js"

const supabaseUrl: string = process.env.REACT_APP_SUPABASE_URL || ""
const supabaseKey: string = process.env.REACT_APP_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseKey)