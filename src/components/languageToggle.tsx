import {
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
} from '@/ui/dropdown-menu'
import { Languages } from 'lucide-react'
import { iconSize } from '@/configs/iconsConstants'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { useLocalStorage  } from "@uidotdev/usehooks"

export function LanguageToggle() {
    const [language, setLanguage] = useLocalStorage("language", "es")
	const { t, i18n } = useTranslation()

	if(i18n.language !== language) {
		i18next.changeLanguage(language)
		document.body.dir = i18n.dir()
	} 
	
	const handleValueChange = (value: string) => {
		setLanguage(value)
		i18next.changeLanguage(value)
		document.body.dir = i18n.dir()
	}

    return (
        <DropdownMenuSub>
			<DropdownMenuSubTrigger>
				<Languages size={iconSize} className='mr-2' /> { t('menu.language') }
			</DropdownMenuSubTrigger>
			<DropdownMenuPortal>
				<DropdownMenuSubContent>
					<DropdownMenuRadioGroup value={language} onValueChange={handleValueChange}>
						<DropdownMenuRadioItem value="es">Español</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuSubContent>
			</DropdownMenuPortal>
		</DropdownMenuSub>
    )
}