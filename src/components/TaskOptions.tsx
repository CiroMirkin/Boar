import { useDispatch } from 'react-redux'
import './TaskOptions.css'
import { CaretLeftIcon, CaretRightIcon } from './atomic/Icon'
import { Btn } from './atomic/Btn'
import { COLORS_CLASS_NAME } from './atomic/colors'
import { moveToType } from '../domainFunctions/moveTask'
import { moveTask } from '../redux/columnsSlice'
import { taskModel } from '../models/task'
import { getTaskOptions } from '../taskOptions'

interface TaskOptionsProps {
    task: taskModel
}

function TaskOptions({ task }: TaskOptionsProps) {
    const dispatch = useDispatch();

    const moveTheTask = (to: moveToType) => {
        const taskId = task.id
        dispatch(moveTask({ to, taskId }))
    }

    const options = getTaskOptions(task)

    return (
        <>
            <li className='first-option'>
                <Btn onClickHandler={() => moveTheTask('prev-column')} color={COLORS_CLASS_NAME.PRIMARY}>
                    <CaretLeftIcon />
                    <span>Retroceder</span>
                </Btn>
                <Btn onClickHandler={() => moveTheTask('next-column')} color={COLORS_CLASS_NAME.PRIMARY}>
                    <span>Avanzar</span>
                    <CaretRightIcon />
                </Btn>
            </li>
            {
                options.map(option => 
                    <li key={option.name} className='option'>
                        <Btn onClickHandler={option.function} color={option.color} border={false} widthAuto={false}>
                            { option.icon! && option.icon() }
                            <span>{option.name}</span>
                        </Btn>
                    </li>
                )
            }
        </>
    )
}

export default TaskOptions