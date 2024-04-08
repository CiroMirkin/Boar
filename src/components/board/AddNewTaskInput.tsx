import { iconSize } from "@/configs/iconsConstants";
import { getNewTask } from "@/models/task";
import { addTaskAtFirstColumn } from "@/redux/taskListInEachColumnReducer";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { useToast } from "@/ui/use-toast";
import { Plus } from "lucide-react";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useDispatch } from "react-redux";

interface AddNewTaskInputProps {}

export function AddNewTaskInput({ }: AddNewTaskInputProps) {
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [canUserUseTheAddTaskInput, setCanUserUseTheAddTaskInput] = useState(false);

    const { toast } = useToast();

    const dispatch = useDispatch();

    const handleClick = () => {
        try {
            const task = getNewTask({ descriptionText: newTaskDescription, columnPosition: '1' });
            dispatch(addTaskAtFirstColumn(task));
            setNewTaskDescription('');
            setCanUserUseTheAddTaskInput(false);
        }
        catch (error) {
            let message: string = 'Unknown Error :(';
            if (error instanceof Error) {
                message = error.message;
            }
            console.error(message);
            toast({
                description: message,
                variant: "destructive",
                duration: 3000
            });
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const taskDescription = e.target.value;
        setNewTaskDescription(taskDescription);
        if (!taskDescription.trim()) setCanUserUseTheAddTaskInput(false);
        else setCanUserUseTheAddTaskInput(true);
    };

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>): void {
        if (e.ctrlKey && e.key === "Enter") handleClick();
    }

    return (
        <>
            <Input
                type="text" value={newTaskDescription}
                className="mr-1.5"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Nueva tarea..." />
            <Button
                onClick={handleClick}
                variant='ghost'
                disabled={!canUserUseTheAddTaskInput && true}
                title="Crear tarea"
            ><Plus size={iconSize} /></Button>
        </>
    );
}
