import { bg_dark_colors_list, bg_light_colors_list } from "@/configs/colors"
import { Card } from "@/ui/card"
import { useDispatch } from "react-redux"
import { setColorTheme } from "../state/boardReducer"

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

    const dispatch = useDispatch() 
    const handleClick = (e: any) => {
        if(!!e.target.id) {
            const [bg, text] = getColorThemeFromId(e.target.id)
            dispatch(setColorTheme({ bg, text }))
        }
    }

    return (
    <>
		<h2 className='text-2xl'>Temas</h2>
        <div className="max-w-2xl py-5 grid gap-3">
            <ul className="flex flex-wrap gap-2" onClick={handleClick}>{colorsList}</ul>
        </div>
    </>
    )
}