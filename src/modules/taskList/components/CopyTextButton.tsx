import { Button } from "@/ui/button";
import { useToast } from "@/ui/use-toast";
import { useTranslation } from "react-i18next";
import { useDataOfTheTask } from "../hooks/useDataOfTheTask";

export function CopyTextButton() {
    const { t } = useTranslation()
	const { toast } = useToast()
    const data = useDataOfTheTask()
    
    const copyTextToClipboard = () => {
        const text = data.descriptionText
        navigator.clipboard.writeText(text).then(() => {
            toast({
                description: t('task_buttons.copy_text_toast'),
                duration: 3000,
            })
        })
    }

    return (
        <Button
            size='sm'
            variant='ghost'
            className='w-full'
            onClick={() => copyTextToClipboard()}
        >
            {t('task_buttons.copy_text')}
        </Button>
    )
}