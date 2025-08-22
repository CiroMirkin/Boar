import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { AvailableTags, eisenhowerTagGroup } from "../model/tags";
import { useTranslation } from "react-i18next";

export const useAvailableTags = (): AvailableTags => {
    let availableTags = useSelector((state: RootState) => state.tags.list)
    const { t } = useTranslation()
    return availableTags.map(tagGroup => {
        // Se traducen las Tags por defecto
        if(tagGroup.id == eisenhowerTagGroup.id) {
            const [ importantTag, necessaryTag ] = tagGroup.tags
            return {
                ...tagGroup,
                tags: [
                    {
                        ...importantTag,
                        name: t('tags.important_tag')
                    },
                    {
                        ...necessaryTag,
                        name: t('tags.necessary_tag')
                    }
                ]
            }
        }
        return tagGroup
    })
}