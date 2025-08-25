import { themesList, Theme as Theme } from '@/modules/Theme/themesList'
import { Card, CardContent } from '@/ui/molecules/card'
import { useTranslation } from 'react-i18next'
import { toast } from "sonner"
import { useEffect, useState } from 'react'
import { useChangeTheme } from './ThemeContext'
import { useTheme } from '@/App'
import { CheckIcon } from '@/ui/atoms/icons'
import { SettingSection } from '@/ui/organisms/SettingSection'

const getColorThemeFromId = (id: string): Theme => JSON.parse(id)

export function ThemeSelection() {
	const [themes, setThemes] = useState([] as React.ReactNode[])
	const actualThemeId = useTheme().id

	useEffect(() => {
		const newThemes: React.ReactNode[] = []
		themesList.forEach((color) => {
			newThemes.push(
				<Card
					className={`w-[68px] h-[68px] p-3 rounded-md ${color.bg} border ${actualThemeId == color.id ? 'border-black' : 'border-transparent' }`}
					key={color.id}
					id={JSON.stringify(color)}
				>
					<CardContent className={`w-full h-full rounded-md ${color.task} grid place-items-center pb-0`}>
						{ actualThemeId == color.id && <CheckIcon className='p-0'/> }
					</CardContent>
				</Card>
			)
		})
		setThemes(newThemes)
	}, [themesList, actualThemeId])

	const { t } = useTranslation()
	const changeTheme = useChangeTheme()
	const toggleTheme = (id: string) => {
		const newTheme = getColorThemeFromId(id)
		changeTheme({ ...newTheme })

		toast.success(t('settings.board.set_board_theme_toast'))
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
		<SettingSection>
			<SettingSection.Title>{t('settings.board.board_theme_section_title')}</SettingSection.Title>
			<SettingSection.Content className='py-0 px-0 grid gap-3 bg-transparent'>
				<div className='flex justify-around flex-wrap gap-2' onClick={handleClick}>
					{themes}
				</div>
			</SettingSection.Content>
		</SettingSection>
	)
}
