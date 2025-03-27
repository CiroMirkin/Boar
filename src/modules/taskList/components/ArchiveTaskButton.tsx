import { Button } from "@/ui/button";
import { useToast } from "@/ui/use-toast";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { archiveTask } from "../archive/state/archiveReducer";
import { deleteTask } from "../state/taskListInEachColumnReducer";
import { useDataOfTheTask } from "../hooks/useDataOfTheTask";

interface ArchiveTaskButtonProps {
	handleClick: (action: () => void) => void
}

export function ArchiveTaskButton({ handleClick }: ArchiveTaskButtonProps) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
	const { toast } = useToast()
    const data = useDataOfTheTask()
    const archiveTaskAction = () => {
		dispatch(archiveTask(data))
		dispatch(deleteTask(data))
		toast({
			description: t('task_buttons.archive_toast'),
			duration: 3000,
		})
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