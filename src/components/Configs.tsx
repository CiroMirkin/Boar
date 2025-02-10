import { useTranslation } from 'react-i18next'
import { Header } from './Header'
import { USER_IS_IN } from './userIsIn'

export function Configs({ children }: { children: React.ReactNode[]}) {
	const { t } = useTranslation()
	return (
		<>
			<Header title={t('menu.configs')} whereUserIs={USER_IS_IN.CONFIG} />
			{ children }
		</>
	)
}
