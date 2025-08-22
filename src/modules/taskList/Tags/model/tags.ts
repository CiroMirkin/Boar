
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

export const eisenhowerTagGroup: TagGroup = {
    id: 'Eisenhower',
    tags: [
        {
            id: '1',
            name: 'Importante',
            variant: "red-subtle",
        }, 
        {
            id: '2',
            name: 'Necesario',
            variant: "green-subtle",
        },
    ]
}

export type AvailableTags = TagGroup[]

export const defaultAvialableTags: AvailableTags = [
    {...eisenhowerTagGroup}
]

export const getTagGroup = ({ tags }: { tags: Tag[] }): TagGroup => {
    return {
        id: crypto.randomUUID(),
        tags: [...tags]
    }
} 