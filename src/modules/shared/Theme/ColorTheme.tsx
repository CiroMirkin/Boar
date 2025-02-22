import { colorThemeList, ColorTheme as Theme } from '@/modules/shared/Theme/colors'
import { Card, CardContent } from '@/ui/card'
import { useTranslation } from 'react-i18next'
import { useToast } from '@/ui/use-toast'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from './ThemeContext'

const getColorThemeFromId = (id: string): Theme => JSON.parse(id)

export function ColorTheme() {
	const [colorsList, setColorList] = useState([] as React.ReactNode[])

	useEffect(() => {
		const newColorList: React.ReactNode[] = []
		colorThemeList.forEach((color) => {
			newColorList.push(
				<Card
					className={`w-20 h-20 p-3 rounded-md ${color.bg} border-black`}
					key={color.id}
					id={JSON.stringify(color)}
				>
					<CardContent className={`w-full h-full rounded-md ${color.task}`}></CardContent>
				</Card>
			)
		})
		setColorList(newColorList)
	}, [])

	const { t } = useTranslation()
	const { toast } = useToast()
	const { changeTheme } = useContext(ThemeContext) 
	const toggleTheme = (id: string) => {
		const colorTheme = getColorThemeFromId(id)
		changeTheme({ ...colorTheme })

		toast({
			description: t('settings.board.set_board_theme_toast'),
			duration: 3000,
		})
	}
	const handleClick = (e: any) => {
		if (!!e.target.id) {
			toggleTheme(e.target.id)
		}
		else if(!!e.target.parentElement.id) {
			toggleTheme(e.target.parentElement.id)

		}
	}

	return (
		<>
			<h2 className='text-2xl'>{t('settings.board.board_theme_section_title')}</h2>
			<div className='max-w-2xl py-5 grid gap-3'>
				<ul className='flex flex-wrap gap-2' onClick={handleClick}>
					{colorsList}
				</ul>
			</div>
		</>
	)
}
