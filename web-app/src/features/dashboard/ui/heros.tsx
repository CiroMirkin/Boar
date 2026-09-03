import type { ReactNode } from 'react'
import { HERO_COUNT } from '../model/heros'

/** Patrones de fondo para la cabecera de una BoardCard. El índice se persiste en
 * `Board.cardCanvas`. Mantener la longitud en sync con `HERO_COUNT`. */
export const heros: readonly ReactNode[] = [
	<div key='0' className='h-full w-full bg-transparent relative text-gray-800'>
		<div
			className='absolute inset-0 z-0 pointer-events-none'
			style={{
				backgroundImage: `
        repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(75, 85, 99, 0.06) 2px, rgba(75, 85, 99, 0.06) 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(67.5deg, transparent, transparent 2px, rgba(107, 114, 128, 0.05) 2px, rgba(107, 114, 128, 0.05) 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(112.5deg, transparent, transparent 2px, rgba(55, 65, 81, 0.04) 2px, rgba(55, 65, 81, 0.04) 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(157.5deg, transparent, transparent 2px, rgba(31, 41, 55, 0.03) 2px, rgba(31, 41, 55, 0.03) 3px, transparent 3px, transparent 8px)
      `,
			}}
		/>
	</div>,
	<div key='1' className='h-full w-full bg-transparent relative text-gray-900'>
		<div
			className='absolute inset-0 z-0 pointer-events-none'
			style={{
				backgroundImage: `
          repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px),
        repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)
        `,
				backgroundSize: '30px 30px',
			}}
		/>
	</div>,
	<div key='2' className='h-full w-full bg-transparent relative text-gray-900'>
		<div
			className='absolute inset-0 z-0 pointer-events-none'
			style={{
				backgroundImage: `
          repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px),
        repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)
        `,
				backgroundSize: '40px 40px',
			}}
		/>
	</div>,
	<div key='3' className='h-full w-full bg-transparent relative text-gray-800'>
		<div
			className='absolute inset-0 z-0 pointer-events-none'
			style={{
				backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(75, 85, 99, 0.06) 5px, rgba(75, 85, 99, 0.06) 6px, transparent 6px, transparent 15px),
        repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(75, 85, 99, 0.06) 5px, rgba(75, 85, 99, 0.06) 6px, transparent 6px, transparent 15px),
        repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(107, 114, 128, 0.04) 10px, rgba(107, 114, 128, 0.04) 11px, transparent 11px, transparent 30px),
        repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(107, 114, 128, 0.04) 10px, rgba(107, 114, 128, 0.04) 11px, transparent 11px, transparent 30px)
      `,
			}}
		/>
	</div>,
]

if (heros.length !== HERO_COUNT) {
	throw new Error(`heros.length (${heros.length}) debe coincidir con HERO_COUNT (${HERO_COUNT})`)
}
