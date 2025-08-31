import { useTranslation } from 'react-i18next'
import { USER_IS_IN } from '../ui/organisms/userIsIn'
import { ChangeBoardName } from '../modules/board/components/ChangeBoardName'
import { ConfigColumns } from '../modules/columnList/components/ConfigColumns'
import CreateReminder from '../modules/taskList/Reminder/CreateReminder'
import { ThemeSelection } from '../modules/Theme/ThemeSelection'
import { useColumnList } from '@/modules/columnList/hooks/useColumnList'
import { ReminderList } from '@/modules/taskList/Reminder/ReminderList'
import PageContainer from './PageContainer'
import { ToggleTypeOfView } from '@/modules/TypeOfView/ToggleTypeOfView'
import { EnableTags } from '@/modules/taskList/Tags/components/EnableTags'

export function Settings() {
	const { t } = useTranslation()

	return (
		<PageContainer
			title={t('menu.configs')}
			whereUserIs={USER_IS_IN.CONFIG}
			className='px-3 pb-6 grid place-items-center'
		>
			<div className='grid gap-4 justify-items-stretch '>
				<ChangeBoardName />
				<ConfigColumns />
				<CreateReminder columnList={useColumnList()} />
				<ReminderList />
				<EnableTags />
				<ToggleTypeOfView />
				<ThemeSelection />
			</div>
		</PageContainer>
	)
}
