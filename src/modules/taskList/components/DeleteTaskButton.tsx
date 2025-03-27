import { useCheckIfThisTaskIsInTheFirstColumn } from "@/sharedByModules/hooks/useCheckIfThisTaskIsInTheFirstColumn";
import { Button } from "@/ui/button";
import { useTranslation } from "react-i18next";
import { useDataOfTheTask } from "../hooks/useDataOfTheTask";
import { useDispatch } from "react-redux";
import { deleteTask } from "../state/taskListInEachColumnReducer";
import { useToast } from "@/ui/use-toast";
import { ToastAction } from "@/ui/toast";

interface DeleteButtonProps {
	handleClick: (action: () => void) => void
}

export function DeleteTaskButton({ handleClick }: DeleteButtonProps) {
    const { t } = useTranslation()
    const { toast } = useToast()
    const data = useDataOfTheTask()
    const isTheTaskInTheFirstColumn = useCheckIfThisTaskIsInTheFirstColumn(data)
    const dispatch = useDispatch()
	const deleteTaskAction = () => dispatch(deleteTask(data))

    const askForConfirmationToDeleteTheTask = () => {
		isTheTaskInTheFirstColumn
			? handleClick(deleteTaskAction)
			: toast({
					description: t('task_buttons.delete_task_warning'),
					variant: 'destructive',
					duration: 3000,
					action: (
						<ToastAction
							altText={t('task_buttons.delete')}
							onClick={() => handleClick(deleteTaskAction)}
						>
							{t('task_buttons.delete')}
						</ToastAction>
					),
				})
	}

    return (
        <Button
			size='sm'
			variant='destructiveGhost'
			className='w-full'
			onClick={askForConfirmationToDeleteTheTask}
		>
			{t('task_buttons.delete')}
		</Button>
    )
}