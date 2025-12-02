import { isSupabaseConfigured, supabase } from '@/lib/supabase'

export const getUserId = async () => {
	if (!isSupabaseConfigured || !supabase) return

	const {
		data: { user },
	} = await supabase.auth.getUser()
	return user?.id
}
