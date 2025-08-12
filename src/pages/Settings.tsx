import { useTranslation } from 'react-i18next'
import { USER_IS_IN } from '../modules/LanguageToggle/userIsIn'
import { useTheme } from "@/App"
import { ChangeBoardName } from '../modules/board/components/ChangeBoardName'
import { ConfigColumns } from '../modules/columnList/components/ConfigColumns'
import CreateReminder from '../modules/taskList/Reminder/CreateReminder'
import { ThemeSelection } from '../modules/Theme/ThemeSelection'
import { useColumnList } from '@/modules/columnList/hooks/useColumnList'
import { ReminderList } from '@/modules/taskList/Reminder/ReminderList'
import PageContainer from './PageContainer'
import { ToggleTypeOfView } from '@/modules/TypeOfView/ToggleTypeOfView'

export function Settings() {
	const { t } = useTranslation()
	const { column } = useTheme()
	const sectionClassName = `max-w-2xl rounded-lg py-4 md:px-11 px-6 ${column}`

	return (
		<PageContainer 
			title={t('menu.configs')} 
			whereUserIs={USER_IS_IN.CONFIG} 
			className='px-3 pb-6 grid place-items-center'
		>
			<div className="grid gap-4 justify-items-stretch ">
				<div className={sectionClassName}>
					<ChangeBoardName />
				</div>
				<div className={sectionClassName}>
					<ConfigColumns />
				</div>
				<div className={sectionClassName}>
					<CreateReminder columnList={ useColumnList() } />
					<ReminderList />
				</div>
				<div className={sectionClassName}>
					<ToggleTypeOfView />
				</div>
				<div className={sectionClassName}>
					<ThemeSelection />
				</div>
			</div>
		</PageContainer> 
	)
}

