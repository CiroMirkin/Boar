import { useTranslation } from 'react-i18next'
import { Header } from '../sharedByModules/Header/Header'
import { USER_IS_IN } from '../sharedByModules/Header/userIsIn'
import { useTheme } from "@/App"

import { ChangeBoardName } from '../modules/board/components/ChangeBoardName'
import { ConfigColumns } from '../modules/columnList/components/ConfigColumns'
import CreateReminder from '../modules/taskList/Reminder/CreateReminder'
import { ThemeSelection } from '../modules/Theme/ThemeSelection'
import { useColumnList } from '@/modules/columnList/hooks/useColumnList'
import { ReminderList } from '@/modules/taskList/Reminder/ReminderList'

export function Configs() {
	const { t } = useTranslation()
	const { bg, text } = useTheme()

	return (
		<>
			<div className={`${bg} ${text}`}>
				<Header title={t('menu.configs')} whereUserIs={USER_IS_IN.CONFIG} />
				<div className="px-3 pb-6 grid justify-items-center">
					<div className="grid gap-4 justify-items-stretch ">
						<ConfigPageContent />
					</div>
				</div>
			</div>
		</>
	)
}

const ConfigPageContent = () => {
	const { column } = useTheme()
	const sectionClassName = `max-w-2xl rounded-lg py-4 md:px-11 px-6 ${column}`
	return (
		<>
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
				<ThemeSelection />
			</div>
		</>
	)
}