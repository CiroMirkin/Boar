import { useTranslation } from 'react-i18next'
import { Header } from '../modules/shared/Header/Header'
import { USER_IS_IN } from '../modules/shared/Header/userIsIn'
import { useColorTheme } from '@/modules/board/hooks/useColorTheme'

export function Configs({ children }: { children: React.ReactNode[] }) {
	const { t } = useTranslation()
	const { bg, text } = useColorTheme()

	return (
		<>
			<div className={`${bg} ${text}`}>
				<Header title={t('menu.configs')} whereUserIs={USER_IS_IN.CONFIG} />
				<div className="px-3 pb-6 grid justify-items-center">
					<div className="grid gap-4 justify-items-stretch ">
						{children}
					</div>
				</div>
			</div>
		</>
	)
}
