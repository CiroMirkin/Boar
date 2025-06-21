import { Button } from "@/ui/button";
import { ScrollArea } from "@/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/ui/sheet";
import { AutoExpandTextarea } from "./AutoExpandTextarea";
import { useToast } from "@/ui/use-toast";
import { useSaveNotes } from "./useSavedNote";
import { useSession } from "@/SessionProvider";
import { useEffect, useState } from "react";
import { getNotesFromSupabase } from "./getNotesFromSupabase";

export default function Notes() {
    const [text, setText] = useState('')
    const placeholder = 'Aquí puedes escribir tus notas, toda esa información que no son tareas.'
    const { session } = useSession()
    const { toast } = useToast()

    useEffect(() => {
        if(!!session) {
            getNotesFromSupabase({ setNotes: setText })
        }
        else {
            // TODO refactorizar
            const lg = localStorage.getItem('boar-notes')
            if(lg == null) window.localStorage.setItem('boar-notes', JSON.stringify({ notes: text }))
            else if(lg != null) setText(JSON.parse(lg).notes)
        }
    }, [session])

    const onChange = (newText: string) => {
        const maxLength = 1500 // Este valor tambien se encuentra en Supabase como condicion
        if(newText.trim().length <= maxLength) {
            setText(newText)
            return;
        }

        toast({
            description: 'Se alcanzo el maximo de caracteres.',
            variant: 'destructive',
        })
    }

    const handleClick = () => {
        useSaveNotes({ session, notes: text })
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant='link'>Notas</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Notas del tablero</SheetTitle>
                    <SheetDescription aria-describedby="sheet-description">Escribe las notas del tablero.</SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-full">
                    <main className="p-2 text-base">
                        <AutoExpandTextarea
                            value={text}
                            onChange={onChange}
                            placeholder={placeholder}
                        />
                    </main>
                </ScrollArea>
                <SheetFooter>
                    <Button onClick={handleClick}>Guardar</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
