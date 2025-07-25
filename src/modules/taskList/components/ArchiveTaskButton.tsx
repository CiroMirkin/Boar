import { Button } from "@/ui/button";
import { toast } from "sonner"
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { archiveTask } from "../archive/state/archiveReducer";
import { deleteTask } from "../state/taskListInEachColumnReducer";
import { useDataOfTheTask } from "../hooks/useDataOfTheTask";
import { useSession } from "@/SessionProvider";
import { useSaveArchive } from "../archive/state/useSaveArchive";
import { getActalArchive } from "../archive/state/getActualArchive";

interface ArchiveTaskButtonProps {
	handleClick: (action: () => void) => void
}

export function ArchiveTaskButton({ handleClick }: ArchiveTaskButtonProps) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const data = useDataOfTheTask()
	const { session } = useSession()
    const archiveTaskAction = () => {
		dispatch(archiveTask(data))
		dispatch(deleteTask(data))
		useSaveArchive({
			session,
			archive: getActalArchive()
		})
		toast.success(t('task_buttons.archive_toast'))
	}

    return (
        <Button
			size='sm'
			variant='ghost'
			className='w-full'
			onClick={() => handleClick(archiveTaskAction)}
		>
			{t('task_buttons.archive')}
		</Button>
    )
}