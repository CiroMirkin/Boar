import { AvailableTags, getTagGroup as getNewTagGroup, Tag } from "../../model/tags"

interface addTagGroupParams  { 
    tags: Tag[] 
    actualAvailableTags: AvailableTags
}

export const addTagGroup = ({ tags, actualAvailableTags }: addTagGroupParams): AvailableTags => {
    const newTagGroup = getNewTagGroup({ tags })
    actualAvailableTags.unshift(newTagGroup)
    return actualAvailableTags
}