'use client'
import { useTranslation } from 'react-i18next'
import { LANGUAGE_LOCALSTORAGE_KEY } from './language'
import { useEffect } from 'react'

export const useSetLanguageSaved = () => {
	const { i18n } = useTranslation()

	useEffect(() => {
		const languageInLocalStorage = localStorage.getItem(LANGUAGE_LOCALSTORAGE_KEY)
		const language = languageInLocalStorage ? JSON.parse(languageInLocalStorage) : ''

		if (language) {
			i18n.changeLanguage(language)
		}
	}, [i18n])
}
