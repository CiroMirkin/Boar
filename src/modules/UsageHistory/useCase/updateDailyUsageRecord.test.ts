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

	test('Debería crear el primer registro cuando el historial está completamente vacío', () => {
		const mockToday = 1700000000000
		vi.spyOn(Date, 'now').mockReturnValue(mockToday)

		const usageHistory: UsageHistory = []
		const originalHistory = structuredClone(usageHistory)

		const result = updateDailyUsageRecord({
			duration: 10000,
			usageHistory,
		})

		expect(result).toHaveLength(1)
		expect(result).toEqual([
			{
				date: mockToday,
				periods: [{ startTimestamp: mockToday, duration: 10000 }],
			},
		])
		expect(usageHistory).toEqual(originalHistory)
		expect(usageHistory).toHaveLength(0)
		expect(isTheSameDay).not.toHaveBeenCalled()
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
		const originalHistory = structuredClone(usageHistory)

		const result = updateDailyUsageRecord({
			duration: 10000,
			usageHistory,
		})

		expect(result).toHaveLength(3)
		expect(result).toEqual([
			...originalHistory,
			{
				date: mockToday,
				periods: [{ startTimestamp: mockToday, duration: 10000 }],
			},
		])
		expect(usageHistory).toEqual(originalHistory)
	})

	test('Debería crear un nuevo período cuando ha pasado mas de una hora desde la ultima sesion', () => {
		const mockToday = 1700000000000
		vi.spyOn(Date, 'now').mockReturnValue(mockToday)
		vi.mocked(isTheSameDay).mockReturnValue(true)
		vi.mocked(needsNewUsageSession).mockReturnValue(true)

		const usageHistory: UsageHistory = [
			{
				date: mockToday - 20000,
				periods: [{ startTimestamp: mockToday - 10000, duration: 5000 }],
			},
			{
				date: mockToday,
				periods: [{ startTimestamp: mockToday - 5000, duration: 3000 }],
			},
		]
		const originalHistory = structuredClone(usageHistory)

		const result = updateDailyUsageRecord({
			duration: 8000,
			usageHistory,
		})

		expect(result).toHaveLength(2)
		expect(result).toEqual([
			originalHistory[0],
			{
				...originalHistory[1],
				periods: [
					...originalHistory[1].periods,
					{ startTimestamp: mockToday, duration: 8000 },
				],
			},
		])
		expect(usageHistory).toEqual(originalHistory)
		expect(needsNewUsageSession).toHaveBeenCalledWith(usageHistory[1])
	})

	test('Debería crear un nuevo período cuando ha pasado mas de 15 minutos desde la ultima sesion', () => {
		const mockToday = 1700000000000
		vi.spyOn(Date, 'now').mockReturnValue(mockToday)
		vi.mocked(isTheSameDay).mockReturnValue(true)
		vi.mocked(needsNewUsageSession).mockReturnValue(true)

		const usageHistory: UsageHistory = [
			{
				date: mockToday - 20000,
				periods: [{ startTimestamp: mockToday - 10000, duration: 5000 }],
			},
			{
				date: mockToday,
				periods: [{ startTimestamp: mockToday - 5000, duration: 3000 }],
			},
		]
		const originalHistory = structuredClone(usageHistory)

		const result = updateDailyUsageRecord({
			duration: 8000,
			usageHistory,
		})

		expect(result).toHaveLength(2)
		expect(result).toEqual([
			originalHistory[0],
			{
				...originalHistory[1],
				periods: [
					...originalHistory[1].periods,
					{ startTimestamp: mockToday, duration: 8000 },
				],
			},
		])
		expect(usageHistory).toEqual(originalHistory)
		expect(needsNewUsageSession).toHaveBeenCalledWith(usageHistory[1])
	})

	test('Debería mantener TODOS los elementos anteriores al modificar el último', () => {
		const mockToday = 1700000000000
		vi.spyOn(Date, 'now').mockReturnValue(mockToday)
		vi.mocked(isTheSameDay).mockReturnValue(true)
		vi.mocked(needsNewUsageSession).mockReturnValue(false)

		const usageHistory: UsageHistory = [
			{ date: 1698000000000, periods: [{ startTimestamp: 1698000000000, duration: 1000 }] },
			{ date: 1699000000000, periods: [{ startTimestamp: 1699000000000, duration: 2000 }] },
			{ date: 1699500000000, periods: [{ startTimestamp: 1699500000000, duration: 3000 }] },
			{ date: mockToday, periods: [{ startTimestamp: mockToday - 1000, duration: 4000 }] },
		]
		const originalHistory = structuredClone(usageHistory)

		const result = updateDailyUsageRecord({
			duration: 5000,
			usageHistory,
		})

		expect(result).toHaveLength(4)
		expect(result[0]).toEqual(originalHistory[0])
		expect(result[1]).toEqual(originalHistory[1])
		expect(result[2]).toEqual(originalHistory[2])
	})

	test('Debería actualizar (no insertar) el último día cuando es el mismo día', () => {
		const mockToday = 1700000000000
		vi.spyOn(Date, 'now').mockReturnValue(mockToday)
		vi.mocked(isTheSameDay).mockReturnValue(true)
		vi.mocked(needsNewUsageSession).mockReturnValue(true)

		const usageHistory: UsageHistory = [
			{
				date: mockToday - 100000,
				periods: [{ startTimestamp: mockToday - 100000, duration: 1000 }],
			},
			{
				date: mockToday - 50000,
				periods: [{ startTimestamp: mockToday - 50000, duration: 2000 }],
			},
			{
				date: mockToday,
				periods: [{ startTimestamp: mockToday - 5000, duration: 3000 }],
			},
		]
		const originalHistory = structuredClone(usageHistory)

		const result = updateDailyUsageRecord({
			duration: 8000,
			usageHistory,
		})

		expect(result).toHaveLength(3)
		expect(result[0]).toEqual(originalHistory[0])
		expect(result[1]).toEqual(originalHistory[1])
		expect(result[2].date).toBe(mockToday)
		expect(result[2].periods).toHaveLength(2)

		const allDates = result.map((r) => r.date)
		const uniqueDates = new Set(allDates)
		expect(allDates.length).toBe(uniqueDates.size)
	})

	test('Debería actualizar (no insertar) el último período del último día cuando han pasado menos de 15 minutos', () => {
		const mockToday = 1700000000000
		vi.spyOn(Date, 'now').mockReturnValue(mockToday)
		vi.mocked(isTheSameDay).mockReturnValue(true)
		vi.mocked(needsNewUsageSession).mockReturnValue(false)

		const usageHistory: UsageHistory = [
			{
				date: mockToday - 100000,
				periods: [{ startTimestamp: mockToday - 100000, duration: 1000 }],
			},
			{
				date: mockToday,
				periods: [
					{ startTimestamp: mockToday - 10000, duration: 2000 },
					{ startTimestamp: mockToday - 8000, duration: 3000 },
					{ startTimestamp: mockToday - 5000, duration: 4000 },
				],
			},
		]
		const originalHistory = structuredClone(usageHistory)

		const result = updateDailyUsageRecord({
			duration: 9000,
			usageHistory,
		})

		expect(result).toHaveLength(2)
		expect(result[0]).toEqual(originalHistory[0])
		expect(result[1].periods).toHaveLength(3)
		expect(result[1].periods[0]).toEqual(originalHistory[1].periods[0])
		expect(result[1].periods[1]).toEqual(originalHistory[1].periods[1])
		expect(result[1].periods[2]).toEqual({
			startTimestamp: mockToday - 5000,
			duration: 9000,
		})
	})
})
