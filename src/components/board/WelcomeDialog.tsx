import { useEffect } from "react"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/ui/dialog"
import { Button } from "@/ui/button"

export function WelcomeDialog(){
    const open = localStorage.getItem('boar-welcome-dialog') ? JSON.parse(localStorage.getItem('boar-welcome-dialog') as string) : false
    useEffect(()=> {
        open == false && localStorage.setItem('boar-welcome-dialog', 'true')
    }, [])

    return(
        <Dialog defaultOpen={open === false && true}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                <DialogTitle>¡Bienvenido!</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-y-2">
                    <p><span className="font-medium">Boar</span> es un aplicación que busca ayudarte con tus tareas diarias o semanales a través de un tablero.</p>
                    <p>En la primer columna del tablero puedes crear tus tareas y cuando lleguen a la última puedes archivarlas.</p>
                    <p>Las tareas archivadas se guardan diariamente y puedes verlas en el archivo.</p>
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