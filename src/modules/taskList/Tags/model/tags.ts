
export interface Tag {
    id: string
    name: string
    variant?: string
}

export interface TagGroup {
    id: string
    tags: Tag[]
}

export const emptyTagGroup = {
    id: 'none', 
    tags: [] 
}

export const eisenhowerTagGroup = {
    id: 'Eisenhower',
    tags: [
        {
            id: '1',
            name: 'Importante',
        }, 
        {
            id: '2',
            name: 'Necesario',
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