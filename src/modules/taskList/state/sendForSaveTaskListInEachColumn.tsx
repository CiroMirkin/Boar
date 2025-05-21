import { getUserId } from "@/sharedByModules/hooks/useSyncUserBoard"
import { TaskListInEachColumn } from "../models/taskList"
import { supabase } from "@/lib/supabase"

export const sendForSaveTaskListInEachColumn = async (list: TaskListInEachColumn) => {
	const user_id = await getUserId()
	const { error } = await supabase
		.from('boards')
		.update({
			task_list_in_each_column: list
		})
		.eq('user_id', user_id)

  if(error) throw error
}