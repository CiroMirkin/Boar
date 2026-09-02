'use client'

import { useTranslation } from 'react-i18next'
import { USER_IS_IN } from '../shared/ui/organisms/userIsIn'
import { ChangeBoardName } from '@/features/boards'
import CreateReminder from '@/modules/TaskBoard/components/Reminder/CreateReminder'
import { ThemeSelection } from '@/shared/preferences/theme'
import { ReminderList } from '@/modules/TaskBoard/components/Reminder/ReminderList'
import PageContainer from './PageContainer'
import { ToggleTypeOfView } from '@/shared/preferences/view-mode'
import { EnableTags } from '@/features/tags'

import { ConfigColumns } from '@/modules/TaskBoard/components/Columns/components/ConfigColumns'
import { useTaskBoardQuery } from '@/modules/TaskBoard/hooks/useTaskBoardQuery'
import { useBoardQuery } from '@/features/boards'

const useColumnListForReminders = (): { name: string; id: string; position: string }[] => {
	const { taskBoard } = useTaskBoardQuery()
	return taskBoard.map((list, i) => ({
		name: list.status,
		id: list.id,
		position: i + 1 + '',
	}))
}

interface Props {
	boardId: string
}

export function Settings({ boardId }: Props) {
	const { t } = useTranslation()
	const columnList = useColumnListForReminders()
	useBoardQuery(boardId)

	return (
		<PageContainer
			title={t('menu.configs')}
			whereUserIs={USER_IS_IN.CONFIG}
			className='px-3 pb-6 grid place-items-center'
		>
			<div className='grid gap-4 justify-items-stretch '>
				<ChangeBoardName id={boardId} />
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
