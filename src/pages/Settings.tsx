import { useTranslation } from 'react-i18next'
import { USER_IS_IN } from '../ui/organisms/userIsIn'
import { ChangeBoardName } from '../modules/board/components/ChangeBoardName'
import CreateReminder from '../modules/taskList/components/Reminder/CreateReminder'
import { ThemeSelection } from '../modules/Theme/ThemeSelection'
import { ReminderList } from '@/modules/taskList/components/Reminder/ReminderList'
import PageContainer from './PageContainer'
import { ToggleTypeOfView } from '@/modules/TypeOfView/ToggleTypeOfView'
import { EnableTags } from '@/modules/taskList/components/Tags/components/EnableTags'

import { ConfigColumns } from '@/modules/taskList/components/Columns/components/ConfigColumns'
import { useListOfTasksInColumnsQuery } from '@/modules/taskList/hooks/useListOfTasksInColumnsQuery'
const useColumnListForReminders = (): { name: string; id: string; position: string }[] => {
	const { listOfTaskInColumns } = useListOfTasksInColumnsQuery()
	return listOfTaskInColumns.map((list, i) => ({
		name: list.status,
		id: list.id,
		position: i + 1 + '',
	}))
}

export function Settings() {
	const { t } = useTranslation()
	const columnList = useColumnListForReminders()

	return (
		<PageContainer
			title={t('menu.configs')}
			whereUserIs={USER_IS_IN.CONFIG}
			className='px-3 pb-6 grid place-items-center'
		>
			<div className='grid gap-4 justify-items-stretch '>
				<ChangeBoardName />
				<ConfigColumns />
				<CreateReminder columnList={columnList} />
				<ReminderList />
				<EnableTags />
				<ToggleTypeOfView />
				<ThemeSelection />
			</div>
		</PageContainer>
	)
}
