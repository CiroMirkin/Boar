import { TagGroup } from './tags'

// Este grupo de etiquetas tiene traduccion, tenelo en cuenta al realizar cambios

export const eisenhowerTagGroup: TagGroup = {
	id: 'Eisenhower',
	tags: [
		{
			id: '1',
			name: '',
			variant: 'purple-subtle',
			priority: 2,
		},
		{
			id: '2',
			name: '',
			variant: 'green-subtle',
			priority: 3,
		},
		{
			id: '3',
			name: '',
			variant: 'red-subtle',
			priority: 1,
		},
	],
}

/**
 * Este grupo de etiquetas tiene traduccion, tenelo en cuenta al realizar cambios.
 */
export const devTagGroup: TagGroup = {
	id: 'Dev',
	tags: [
		{
			id: 'Importante',
			name: '',
			variant: 'purple-subtle',
			priority: 2,
		},
		{
			id: 'Necesario',
			name: '',
			variant: 'green-subtle',
			priority: 3,
		},
		{
			id: 'Urgente',
			name: '',
			variant: 'red-subtle',
			priority: 1,
		},
		{
			id: 'Explorar',
			name: '',
			variant: 'blue-subtle',
		},
		{
			id: 'Resolver',
			name: '',
			variant: 'amber-subtle',
			priority: 2,
		},
	],
}
