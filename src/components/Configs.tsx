import { useTranslation } from 'react-i18next'
import { Header } from '../modules/shared/Header/Header'
import { USER_IS_IN } from '../modules/shared/Header/userIsIn'
import { useContext } from 'react'
import { ThemeContext } from '@/modules/shared/Theme/ThemeContext'

import { ChangeBoardName } from '../modules/board/components/ChangeBoardName'
import { ConfigColumns } from '../modules/columnList/components/ConfigColumns'
import Reminder from '../modules/columnList/components/Reminder'
import { ThemeSelection } from '../modules/shared/Theme/ThemeSelection'

export function Configs() {
	const { t } = useTranslation()
	const { theme } = useContext(ThemeContext)
	const { bg, text } = theme

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
	const { theme } = useContext(ThemeContext)
	const { column } = theme
	const sectionClassName = `max-w-2xl rounded-lg py-2 md:px-11 px-6 ${column}`
	return (
		<>
			<div className={sectionClassName}>
				<ChangeBoardName />
			</div>
			<div className={sectionClassName}>
				<ConfigColumns />
			</div>
			<div className={sectionClassName}>
				<Reminder />
			</div>
			<div className={sectionClassName}>
				<ThemeSelection />
			</div>
		</>
	)
}