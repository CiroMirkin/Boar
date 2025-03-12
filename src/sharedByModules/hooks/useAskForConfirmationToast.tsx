import { ToastAction } from '@/ui/toast'
import { useToast } from '@/ui/use-toast'
import { useTranslation } from 'react-i18next'

interface useAskForConfirmationParams {
	confirmationText: string
	action: () => void
}

type FunctionToAskConfirmation = () => void

export const useAskForConfirmationToast = ({
	confirmationText,
	action,
}: useAskForConfirmationParams): FunctionToAskConfirmation => {
	const { toast } = useToast()
	const { t } = useTranslation()
	return () =>
		toast({
			description: confirmationText,
			variant: 'destructive',
			duration: 3000,
			action: (
				<ToastAction altText={ t('delete_toast_btn') } onClick={action}>
					{ t('delete_toast_btn') }
				</ToastAction>
			),
		})
}
