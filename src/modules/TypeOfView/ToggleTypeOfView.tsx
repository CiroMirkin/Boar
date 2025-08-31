import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { defaultView, TypeOfView, typeOfViewLocalStorageKey } from './typeOfView'
import { useLocalStorage } from '@uidotdev/usehooks'
import { CheckView } from './CheckView'
import { SettingSection } from '@/ui/organisms/SettingSection'

export function ToggleTypeOfView() {
	const [actualTypeOfView, changeView] = useLocalStorage(typeOfViewLocalStorageKey, defaultView)
	const { t } = useTranslation()

	const handleValueChange = (newTypeOfView: TypeOfView) => {
		changeView(newTypeOfView)
		toast.success(t('settings.type_of_view.successful_toast'))
	}

	return (
		<SettingSection>
			<SettingSection.Title>{t('settings.type_of_view.section_title')}</SettingSection.Title>
			<SettingSection.Description>
				{t('settings.type_of_view.section_description')}
			</SettingSection.Description>
			<SettingSection.Content className='flex justify-around flex-wrap gap-4'>
				<CheckView
					view={TypeOfView.BOARD}
					handleValueChange={handleValueChange}
					actualTypeOfView={actualTypeOfView}
					label={t('settings.type_of_view.board_option_view')}
				/>
				<CheckView
					view={TypeOfView.LIST}
					handleValueChange={handleValueChange}
					actualTypeOfView={actualTypeOfView}
					label={t('settings.type_of_view.list_option_view')}
				/>
				<CheckView
					view={TypeOfView.NOTE_LIST}
					handleValueChange={handleValueChange}
					actualTypeOfView={actualTypeOfView}
					label={t('settings.type_of_view.list_note_option_view')}
				/>
			</SettingSection.Content>
		</SettingSection>
	)
}
