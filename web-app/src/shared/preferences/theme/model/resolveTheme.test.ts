import { resolveTheme } from './resolveTheme'
import { themesList, lightTheme } from './themesList'

describe('resolveTheme', () => {
	test('devuelve el tema cuando el id existe', () => {
		expect(resolveTheme('retro', themesList).id).toBe('retro')
	})

	test('cae a lightTheme cuando el id no existe', () => {
		expect(resolveTheme('no-existe', themesList)).toStrictEqual(lightTheme)
	})

	test('cae a lightTheme cuando el id es null/undefined', () => {
		expect(resolveTheme(null, themesList)).toStrictEqual(lightTheme)
		expect(resolveTheme(undefined, themesList)).toStrictEqual(lightTheme)
	})
})
