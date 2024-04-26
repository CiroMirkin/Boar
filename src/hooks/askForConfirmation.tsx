import { ToastAction } from "@/ui/toast";
import { useToast } from "@/ui/use-toast";

interface useAskForConfirmationParams {
    confirmationText: string,
    action: () => void
}

type FunctionToAskConfirmation = () => void

export const useAskForConfirmationToast = ({ confirmationText, action }: useAskForConfirmationParams): FunctionToAskConfirmation => {
    const { toast } = useToast();
    return () => toast({
        description: confirmationText,
        variant: "destructive",
        duration: 3000,
        action: <ToastAction altText="Eliminar" onClick={action}>Eliminar</ToastAction>,
    })
}