import { supabase } from "@/lib/supabase";
import { Dispatch } from "@reduxjs/toolkit";
import { setArchive } from "./archiveReducer";
import { getUserId } from "@/sharedByModules/hooks/useSyncUserBoard";
import { store } from "@/store";

export const useSyncArchive = async (dispatch: Dispatch) => {
    const { data } = await supabase
        .from('archive')
        .select('*')

    if(data != null && data.length === 0){
        const userId = await getUserId()
        const { error } = await supabase.from('archive').insert({
            user_id: userId,
            task_list: store.getState().archive.list,
        })
        if(error) throw error
    }
    else if (data != null) {
        const archive = data[0].task_list
        dispatch(setArchive(archive))
    }
}