import { useTranslation } from 'react-i18next'
import { Header } from './Header'
import { USER_IS_IN } from './userIsIn'
import { useColorTheme } from '@/modules/board/hooks/useColorTheme'

export function Configs({ children }: { children: React.ReactNode[]}) {
	const { t } = useTranslation()	
	const { bg, text } = useColorTheme()
	
	return (
		<>
			<div className={`${bg} ${text}`}>
				<Header title={t('menu.configs')} whereUserIs={USER_IS_IN.CONFIG} />
				{ children }
			</div>
		</>
	)
}
