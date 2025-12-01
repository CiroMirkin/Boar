import '@testing-library/jest-dom'
import { vi } from 'vitest'

if (typeof window !== 'undefined') {
	if (!('getClientRects' in document.createElement('div'))) {
		HTMLElement.prototype.getClientRects = function (): DOMRectList {
			const rect = this.getBoundingClientRect()
			const domRect = new DOMRect(rect.left, rect.top, rect.width, rect.height)

			const rectList: DOMRectList = {
				length: 1,
				item: (index: number): DOMRect | null => (index === 0 ? domRect : null),
				[Symbol.iterator]: function* (): Generator<DOMRect> {
					yield domRect
				},
				0: domRect,
			} as DOMRectList

			return rectList
		}
	}

	if (!('getBoundingClientRect' in document.createRange())) {
		document.createRange = (): Range => {
			const range = new Range()

			range.getBoundingClientRect = (): DOMRect => {
				return new DOMRect(0, 0, 0, 0)
			}

			range.getClientRects = (): DOMRectList => {
				const emptyRectList: DOMRectList = {
					length: 0,
					item: (): null => null,
					[Symbol.iterator]: function* (): Generator<DOMRect> {
						// Empty iterator
					},
				} as DOMRectList
				return emptyRectList
			}
			return range
		}
	}

	if (!('elementFromPoint' in document)) {
		const doc = document as Document
		doc.elementFromPoint = vi.fn((): Element | null => null)
	}
}
