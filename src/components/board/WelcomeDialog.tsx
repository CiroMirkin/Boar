import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "@/ui/button"

export function WelcomeDialog(){
    return(
        <Dialog defaultOpen>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                <DialogTitle>¡Bienvenido!</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-y-1">
                    <p><span className="font-medium">Boar</span> es un aplicación que busca ayudarte con tus tareas diarias o semales.</p>
                </div>
                <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                    <Button type="button" variant="default">Empezar</Button>
                </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}