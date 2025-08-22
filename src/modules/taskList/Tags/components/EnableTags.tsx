import { Card, CardContent } from "@/ui/molecules/card"
import { useAvailableTags } from "../hooks/useAvailableTags"
import { useActualTagGroup } from "../hooks/useActualTagGroup"
import { Badge } from "@/ui/atoms/badge"
import { emptyTagGroup, TagGroup } from "../model/tags"
import { useDispatch } from "react-redux"
import { changeActualTagGroup } from "../state/tagsReducer"
import { toast } from "sonner"
import { useTheme } from "@/App"
import { useTranslation } from "react-i18next"

export function EnableTags() {
    const { t } = useTranslation()
    const availableTags = useAvailableTags()
    const actualTagGroup = useActualTagGroup()

    const dispatch = useDispatch()
    const handleClick = (tagGroup: TagGroup) => {
        if(actualTagGroup.id === tagGroup.id) {
            dispatch(changeActualTagGroup(emptyTagGroup))
            toast.info(t('settings.tags.disble_tags_toast'))
            return;
        }
        dispatch(changeActualTagGroup(tagGroup))
        toast.success(t('settings.tags.enable_tags_toast'))
    }

    const accentColor = useTheme().task
    return (
        <div className="">
            <h2 className="text-2xl">{t('settings.tags.enable_tags_section_title')}</h2>
            <p className="opacity-75 mb-4">{t('settings.tags.enable_tags_section_description')}</p>
            { availableTags.map(availableTagGroup => (
                <Card 
                    className={`w-auto rounded-md border border-solid ${accentColor} ${availableTagGroup.id == actualTagGroup.id ? 'border-black' : 'border-transparent opacity-70' }
                    key={availableTagGroup.id}`} 
                    onClick={() => handleClick(availableTagGroup)}
                >
                    <CardContent className="pt-4 flex gap-3">
                        { availableTagGroup.tags.map(tag => (
                            <Badge key={tag.id} variant="inverted">{ tag.name }</Badge>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}