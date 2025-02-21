import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import es from './es.json'
import en from './en.json'

i18next.use(initReactI18next).init({
	lng: 'es',
	debug: true,
	resources: {
		en: {
			translation: en,
		},
		es: {
			translation: es,
		},
	},
	// if you see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz"
	// set returnNull to false (and also in the i18next.d.ts options)
	// returnNull: false,
})

export default i18next
