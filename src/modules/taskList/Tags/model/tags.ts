import { devTagGroup, eisenhowerTagGroup } from './defaultTags'

type TagVariants =
	| 'gray'
	| 'gray-subtle'
	| 'blue'
	| 'blue-subtle'
	| 'purple'
	| 'purple-subtle'
	| 'amber'
	| 'amber-subtle'
	| 'red'
	| 'red-subtle'
	| 'pink'
	| 'pink-subtle'
	| 'green'
	| 'green-subtle'
	| 'teal'
	| 'inverted'
	| 'trial'

export interface Tag {
	id: string
	name: string
	variant?: TagVariants
}

export interface TagGroup {
	id: string
	tags: Tag[]
}

export const emptyTagGroup = {
	id: 'none',
	tags: [],
}

export type AvailableTags = TagGroup[]

export const defaultAvialableTags: AvailableTags = [{ ...eisenhowerTagGroup }, { ...devTagGroup }]

export const getTagGroup = ({ tags }: { tags: Tag[] }): TagGroup => {
	return {
		id: crypto.randomUUID(),
		tags: [...tags],
	}
}
