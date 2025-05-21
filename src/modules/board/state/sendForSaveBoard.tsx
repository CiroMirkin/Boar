import { getUserId } from "@/sharedByModules/hooks/useSyncUserBoard"
import { supabase } from "@/lib/supabase"
import { boardModel } from "../models/board"

export const sendForSaveBoard = async (board: boardModel) => {
    const user_id = await getUserId()
    const { error } = await supabase
        .from('boards')
        .update({
            name: board.name
        })
        .eq('user_id', user_id)

  if(error) throw error
}