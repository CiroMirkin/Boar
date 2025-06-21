import { supabase } from "@/lib/supabase"
import { getUserId } from "@/sharedByModules/hooks/useSyncUserBoard"

export const sendForSaveNotes = async ({ notes }: { notes: string }) => {
    const user_id = await getUserId()
    const { error } = await supabase
        .from('boards')
        .update({ notes })
        .eq('user_id', user_id)

  if(error) throw error
}