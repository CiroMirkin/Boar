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
import { CheckIcon } from "@/ui/atoms/icons"
import { SettingSection } from "@/ui/organisms/SettingSection"

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
        <SettingSection>
            <SettingSection.Title>{t('settings.tags.enable_tags_section_title')}</SettingSection.Title>
            <SettingSection.Description>{t('settings.tags.enable_tags_section_description')}</SettingSection.Description>
            <SettingSection.Content className="py-0 px-0 bg-transparent">
                { availableTags.map(availableTagGroup => (
                    <Card 
                    className={`w-auto rounded-md border border-solid ${accentColor} ${availableTagGroup.id == actualTagGroup.id ? 'border-black' : 'border-transparent' }`} 
                    key={availableTagGroup.id}
                    onClick={() => handleClick(availableTagGroup)}
                    >
                        <CardContent className="pt-4 flex gap-3 items-center">
                            {
                                availableTagGroup.id == actualTagGroup.id && <CheckIcon />
                            }
                            { availableTagGroup.tags.map(tag => (
                                <Badge 
                                key={tag.id} 
                                variant={!!tag.variant ? tag.variant : "inverted"}
                                >{ tag.name }</Badge>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </SettingSection.Content>
        </SettingSection>
    )
}