import {
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
} from '@/ui/dropdown-menu'
import { Languages } from 'lucide-react'
import { iconSize } from '@/modules/shared/configs/iconsConstants'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { useLocalStorage, usePreferredLanguage } from "@uidotdev/usehooks"

export function LanguageToggle() {
    const [language, setLanguage] = useLocalStorage("language", "es")
	const { t, i18n } = useTranslation()

	if(i18n.language !== language) { 
		if(i18n.language === "en" && usePreferredLanguage().slice(0, 2) == "en") {
			// La preferencia de idioma del usuario es ingles y debe actualizarse el toggle
			// Al entrar a Boar el idioma se cambia a ingles según las preferencias del usuario, este cambio de hace en App.tsx
			i18next.changeLanguage("en")
			setLanguage("en")
		}
		else {
			i18next.changeLanguage(language)
			document.body.dir = i18n.dir()
		}
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