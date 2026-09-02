import i18next from 'i18next'

import es from './es.json'
import en from './en.json'

const serverI18n = i18next.createInstance()

serverI18n.init({
	lng: 'es',
	resources: {
		en: {
			translation: en,
		},
		es: {
			translation: es,
		},
	},
})

export default serverI18n
