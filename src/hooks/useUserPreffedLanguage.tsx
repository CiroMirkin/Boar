import { useEffect } from 'react'
import { usePreferredLanguage  } from "@uidotdev/usehooks"
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

export const useUserPreffedLanguage = () => {
    const { i18n } = useTranslation()
	const userPrerredLanguage = usePreferredLanguage().slice(0, 2)
	useEffect(() => {
		if(userPrerredLanguage == 'en') {
			i18next.changeLanguage(userPrerredLanguage)
			document.body.dir = i18n.dir()
		}
	}, [])
}