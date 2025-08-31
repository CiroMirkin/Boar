
type TagVariants = 
    "gray" | "gray-subtle" | 
    "blue" | "blue-subtle" | 
    "purple" | "purple-subtle" | 
    "amber" | "amber-subtle" | 
    "red" | "red-subtle" | 
    "pink" | "pink-subtle" | 
    "green" | "green-subtle" | 
    "teal" | "inverted" | "trial"

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
    tags: [] 
}

// Este grupo de etiquetas tiene traduccion, tenelo en cuenta al realizar cambios
export const eisenhowerTagGroup: TagGroup = {
    id: 'Eisenhower',
    tags: [
        {
            id: '1',
            name: 'Importante',
            variant: "purple-subtle",
        }, 
        {
            id: '2',
            name: 'Necesario',
            variant: "green-subtle",
        },
        {
            id: '3',
            name: 'Urgente',
            variant: "red-subtle",
        },
    ]
}

export type AvailableTags = TagGroup[]

export const defaultAvialableTags: AvailableTags = [
    {...eisenhowerTagGroup},
    {
        id: 'Others',
        tags: [
            {
                id: 'Importante',
                name: 'Importante',
                variant: "purple-subtle",
            }, 
            {
                id: 'Urgente',
                name: 'Urgente',
                variant: "red-subtle",
            },
            {
                id: 'Necesario',
                name: 'Necesario',
                variant: "green-subtle",
            },
            {
                id: 'Explorar',
                name: 'Explorar',
                variant: "blue-subtle",
            },
        ]
}
]

export const getTagGroup = ({ tags }: { tags: Tag[] }): TagGroup => {
    return {
        id: crypto.randomUUID(),
        tags: [...tags]
    }
} 