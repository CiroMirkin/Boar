import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import { useDispatch } from "react-redux";
import { toggleView } from "../state/columnListReducer";
import { useTypeOfView } from "../hooks/useTypeOfView";
import { toast } from "sonner";
import { ColumnsIcon } from "@/ui/icons";

export function ToggleTypeOfView() {
    const actualTypeOfView = useTypeOfView()

    const dispatch = useDispatch()
    const handleValueChange = () => {
        dispatch(toggleView())
        toast.success('¡El tipo de vista se cambió con éxito!')
    }

    return (
        <div className="w-full flex flex-col gap-y-3">
			<header>
                <h2 className='text-2xl'>Tipo de vista</h2>
                <p>Esta será la forma en la que se verá su tablero.</p>
            </header>
            <main className="flex gap-2 items-center">
                <div>
                    <ColumnsIcon 
                        size={30} 
                        className={`transition-transform transition-normal duration-500 ease-out ${actualTypeOfView == 'LIST' && 'rotate-90'}`} 
                    />
                </div>
                <Select onValueChange={handleValueChange} defaultValue={actualTypeOfView} >
                    <SelectTrigger className="w-[180px]" >
                        <SelectValue placeholder="Tipo de vista" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="BOARD">Tablero</SelectItem>
                        <SelectItem value="LIST">Lista</SelectItem>
                    </SelectContent>
                </Select>
            </main>
        </div>
    )
}