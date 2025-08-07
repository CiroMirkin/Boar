import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import { toast } from "sonner";
import { ColumnsIcon } from "@/ui/icons";
import { useTranslation } from "react-i18next";
import { defaultView, TypeOfView, typeOfViewLocalStorageKey } from "./TypeOfView";
import { useLocalStorage } from "@uidotdev/usehooks";


export function ToggleTypeOfView() {
    const [ actualTypeOfView, changeView ] = useLocalStorage(typeOfViewLocalStorageKey, defaultView)
    const { t } = useTranslation()

    const handleValueChange = (newTypeOfView: TypeOfView) => {
        changeView(newTypeOfView)
        toast.success(t('settings.type_of_view.successful_toast'))
    }

    return (
        <div className="w-full flex flex-col gap-y-3">
			<header>
                <h2 className='text-2xl'>{ t('settings.type_of_view.section_title') }</h2>
                <p className="opacity-75">{ t('settings.type_of_view.section_description') }</p>
            </header>
            <main className="flex gap-2 items-center">
                <div>
                    <ColumnsIcon 
                        size={30} 
                        className={`transition-transform transition-normal duration-500 ease-out ${actualTypeOfView == 'LIST' && 'rotate-90'}`} 
                    />
                </div>
                <Select onValueChange={handleValueChange} defaultValue={defaultView} >
                    <SelectTrigger className="w-[180px]" >
                        <SelectValue placeholder={ t('settings.type_of_view.section_title') } />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="BOARD">{ t('settings.type_of_view.board_option_view') }</SelectItem>
                        <SelectItem value="LIST">{ t('settings.type_of_view.list_option_view') }</SelectItem>
                        <SelectItem value="NOTE-LIST">{ t('settings.type_of_view.list_note_option_view') }</SelectItem>
                    </SelectContent>
                </Select>
            </main>
        </div>
    )
}