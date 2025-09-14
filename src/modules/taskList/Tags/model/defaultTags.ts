import { TagGroup } from './tags'

// Este grupo de etiquetas tiene traduccion, tenelo en cuenta al realizar cambios

export const eisenhowerTagGroup: TagGroup = {
	id: 'Eisenhower',
	tags: [
		{
			id: '1',
			name: '',
			variant: 'purple-subtle',
		},
		{
			id: '2',
			name: '',
			variant: 'green-subtle',
		},
		{
			id: '3',
			name: '',
			variant: 'red-subtle',
		},
	],
}

export const devTagGroup: TagGroup = {
	id: 'Dev',
	tags: [
		{
			id: 'Importante',
			name: 'Importante',
			variant: 'purple-subtle',
		},
		{
			id: 'Necesario',
			name: 'Necesario',
			variant: 'green-subtle',
		},
		{
			id: 'Urgente',
			name: 'Urgente',
			variant: 'red-subtle',
		},
		{
			id: 'Explorar',
			name: 'Explorar',
			variant: 'blue-subtle',
		},
		{
			id: 'Resolver',
			name: 'Resolver',
			variant: 'amber-subtle',
		},
	],
}
