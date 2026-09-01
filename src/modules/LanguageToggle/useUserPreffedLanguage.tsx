import { useEffect } from 'react'
import { usePreferredLanguage } from '@/common/hooks/usePreferredLanguage'
import { useTranslation } from 'react-i18next'

export const useUserPreffedLanguage = () => {
	const { i18n } = useTranslation()
	const userPreferredLanguage = usePreferredLanguage().slice(0, 2)

	useEffect(() => {
		if (userPreferredLanguage === 'en') {
			i18n.changeLanguage(userPreferredLanguage)
			document.body.dir = i18n.dir()
		}
	}, [userPreferredLanguage, i18n])
}
