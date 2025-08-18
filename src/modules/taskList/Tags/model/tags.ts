
export interface Tag {
    id: string
    name: string
    variant?: string
}

const defaultTagList: Tag[] = [
    {
        id: '1',
        name: 'Importante',
    }, 
    {
        id: '2',
        name: 'Necesario',
    },
]

export interface TagGroup {
    id: string
    tags: Tag[]
}

export type AvailableTags = TagGroup[]

export const defaultAvialableTags: AvailableTags = [
    {
        id: 'default',
        tags: [...defaultTagList]
    }
]

export const getTagGroup = ({ tags }: { tags: Tag[] }): TagGroup => {
    return {
        id: crypto.randomUUID(),
        tags: [...tags]
    }
} 