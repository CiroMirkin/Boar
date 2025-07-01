import { themesList, Theme as Theme } from '@/sharedByModules/Theme/themesList'
import { Card, CardContent } from '@/ui/card'
import { useTranslation } from 'react-i18next'
import { useToast } from '@/ui/use-toast'
import { useEffect, useState } from 'react'
import { useChangeTheme } from './ThemeContext'

const getColorThemeFromId = (id: string): Theme => JSON.parse(id)

export function ThemeSelection() {
	const [themes, setThemes] = useState([] as React.ReactNode[])

	useEffect(() => {
		const newThemes: React.ReactNode[] = []
		themesList.forEach((color) => {
			newThemes.push(
				<Card
					className={`w-[68px] h-[68px] p-3 rounded-md ${color.bg} border-black`}
					key={color.id}
					id={JSON.stringify(color)}
				>
					<CardContent className={`w-full h-full rounded-md ${color.task}`}></CardContent>
				</Card>
			)
		})
		setThemes(newThemes)
	}, [themesList])

	const { t } = useTranslation()
	const { toast } = useToast()
	const changeTheme = useChangeTheme()
	const toggleTheme = (id: string) => {
		const newTheme = getColorThemeFromId(id)
		changeTheme({ ...newTheme })

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
				<ul className='flex justify-around flex-wrap gap-2' onClick={handleClick}>
					{themes}
				</ul>
			</div>
		</>
	)
}
