import { colorThemeList, ColorTheme as Theme } from '@/modules/shared/configs/colors'
import { Card, CardContent } from '@/ui/card'
import { useDispatch } from 'react-redux'
import { setColorTheme } from '../../board/state/boardReducer'
import { useTranslation } from 'react-i18next'
import { useToast } from '@/ui/use-toast'
import { useEffect, useState } from 'react'

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
	const dispatch = useDispatch()
	const toggleTheme = (id: string) => {
		const colorTheme = getColorThemeFromId(id)
		dispatch(setColorTheme({ ...colorTheme }))
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
