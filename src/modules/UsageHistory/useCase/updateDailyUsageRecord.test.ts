import { describe, test, expect, beforeEach } from 'vitest'
import { updateDailyUsageRecord } from './updateDailyUsageRecord'
import { UsageHistory } from '../model/usageHistory'
import { needsNewUsageSession } from '../model/needsNewUsageSession'
import { isTheSameDay } from '../utils/isTheSameDay'

vi.mock('../model/needsNewUsageSession')
vi.mock('../utils/isTheSameDay')

describe('updateDailyUsageRecord', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	test('Deberia crear un nuevo registro si cuando el historial está vacío', () => {
		const mockToday = 1700000000000
		vi.spyOn(Date, 'now').mockReturnValue(mockToday)
		vi.mocked(isTheSameDay).mockReturnValue(false)

		const usageHistory: UsageHistory = [
			{
				date: 1699000000000,
				periods: [{ startTimestamp: 1699000000000, duration: 5000 }],
			},
		]

		const result = updateDailyUsageRecord({
			duration: 10000,
			usageHistory,
		})

		expect(result).toHaveLength(2)
		expect(result[1]).toEqual({
			date: mockToday,
			periods: [{ startTimestamp: mockToday, duration: 10000 }],
		})
	})

	test('Deberia crear un nuevo registro si el último registro es de un día diferente al actual', () => {
		const mockToday = 1700000000000
		vi.spyOn(Date, 'now').mockReturnValue(mockToday)
		vi.mocked(isTheSameDay).mockReturnValue(false)

		const usageHistory: UsageHistory = [
			{
				date: 1698000000000,
				periods: [{ startTimestamp: 1698000000000, duration: 3000 }],
			},
			{
				date: 1699000000000,
				periods: [{ startTimestamp: 1699000000000, duration: 5000 }],
			},
		]

		const result = updateDailyUsageRecord({
			duration: 10000,
			usageHistory,
		})

		expect(result).toHaveLength(3)
		expect(result[2]).toEqual({
			date: mockToday,
			periods: [{ startTimestamp: mockToday, duration: 10000 }],
		})
	})

	test('Debería crear un nuevo período cuando ha pasado mas de una hora desde la ultima sesion', () => {
		const mockToday = 1700000000000
		vi.spyOn(Date, 'now').mockReturnValue(mockToday)
		vi.mocked(isTheSameDay).mockReturnValue(true)
		vi.mocked(needsNewUsageSession).mockReturnValue(true)

		const usageHistory: UsageHistory = [
			{
				date: mockToday,
				periods: [{ startTimestamp: mockToday - 10000, duration: 5000 }],
			},
			{
				date: mockToday,
				periods: [{ startTimestamp: mockToday - 5000, duration: 3000 }],
			},
		]

		const result = updateDailyUsageRecord({
			duration: 8000,
			usageHistory,
		})

		expect(result[1].periods).toHaveLength(2)
		expect(result[1].periods[1]).toEqual({
			startTimestamp: mockToday,
			duration: 8000,
		})
		expect(needsNewUsageSession).toHaveBeenCalledWith(usageHistory[1])
	})

	test('Debería actualizar el último período cuando ha pasado menos de una hora desde la ultima sesion', () => {
		const mockToday = 1700000000000
		vi.spyOn(Date, 'now').mockReturnValue(mockToday)
		vi.mocked(isTheSameDay).mockReturnValue(true)
		vi.mocked(needsNewUsageSession).mockReturnValue(false)

		const usageHistory: UsageHistory = [
			{
				date: mockToday,
				periods: [{ startTimestamp: mockToday - 10000, duration: 5000 }],
			},
			{
				date: mockToday,
				periods: [{ startTimestamp: mockToday - 5000, duration: 10000 }],
			},
		]

		const result = updateDailyUsageRecord({
			duration: 15000,
			usageHistory,
		})

		expect(result[1].periods).toHaveLength(1)
		expect(result[1].periods[0].duration).toBe(15000)
		expect(needsNewUsageSession).toHaveBeenCalledWith(usageHistory[1])
	})
})
