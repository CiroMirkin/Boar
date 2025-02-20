import { bg_dark_colors_list, bg_light_colors_list } from "@/configs/colors"
import { Card } from "@/ui/card"
import { useDispatch } from "react-redux"
import { setColorTheme } from "../modules/board/state/boardReducer"
import { useTranslation } from "react-i18next"
import { useToast } from "@/ui/use-toast"

const getColorThemeFromId = (id: string): string[] => id.split(',')

export function ColorTheme({}) {
    const colorsList: React.ReactNode[] = []
	bg_light_colors_list.forEach((color) => {
		colorsList.push(
			<Card 
                className={`w-10 h-10 rounded-md ${color.bg}`} 
                key={color.bg}
                id={`${color.bg},${color.text}`}
            ></Card>
		)
	})
	bg_dark_colors_list.forEach((color) => {
		colorsList.push(
			<Card 
                className={`w-10 h-10 rounded-md ${color.bg}`} 
                key={color.bg}
                id={`${color.bg},${color.text}`}
            ></Card>
		)
	})

    const { t } = useTranslation() 
    const { toast } = useToast()
    const dispatch = useDispatch() 
    const handleClick = (e: any) => {
        if(!!e.target.id) {
            const [bg, text] = getColorThemeFromId(e.target.id)
            dispatch(setColorTheme({ bg, text }))
            toast({
				description: t('settings.board.set_board_theme_toast'),
				duration: 3000,
			})
        }
    }

    return (
    <>
		<h2 className='text-2xl'>{ t('settings.board.board_theme_section_title') }</h2>
        <div className="max-w-2xl py-5 grid gap-3">
            <ul className="flex flex-wrap gap-2" onClick={handleClick}>{colorsList}</ul>
        </div>
    </>
    )
}