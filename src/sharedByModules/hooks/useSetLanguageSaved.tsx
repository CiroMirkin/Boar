import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { LANGUAGE_LOCALSTORAGE_KEY } from '../configs/language'

export const useSetLanguageSaved = () => {
    const { i18n } = useTranslation()
    const languageInLocalStorage =  localStorage.getItem(LANGUAGE_LOCALSTORAGE_KEY)
	const language = languageInLocalStorage ? JSON.parse(localStorage.getItem(LANGUAGE_LOCALSTORAGE_KEY) as string) : ""
	
    if (i18n.language !== language && !!language) {
		i18next.changeLanguage(language)
		document.body.dir = i18n.dir()
	}
}