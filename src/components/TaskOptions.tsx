import './TaskOptions.css'
import { CaretLeftIcon, CaretRightIcon } from './atomic/Icon'
import { Btn } from './atomic/Btn'
import { taskModel } from '../models/task'
import { getMoveTaskOptions, getTaskOptions } from '../domainOptions/taskOptions'

interface TaskOptionsProps {
    task: taskModel
}

function TaskOptions({ task }: TaskOptionsProps) {
    const [ movePrev, moveNext ] = getMoveTaskOptions(task) 
    const options = getTaskOptions(task)

    return (
        <>
            <li className='first-option'>
                <Btn onClickHandler={movePrev.function} color={movePrev.color}>
                    <CaretLeftIcon />
                    <span>{ movePrev.name }</span>
                </Btn>
                <Btn onClickHandler={moveNext.function} color={moveNext.color}>
                    <span>{ moveNext.name }</span>
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