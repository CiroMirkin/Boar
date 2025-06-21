import { Button } from "@/ui/button";
import { ScrollArea } from "@/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/ui/sheet";
import { useLocalStorage } from "@uidotdev/usehooks";
import { AutoExpandTextarea } from "./AutoExpandTextarea";
import { useToast } from "@/ui/use-toast";

export default function Notes() {
    const [text, setText] = useLocalStorage('notes', '')
    const placeholder = 'Aquí puedes escribir tus notas, toda esa información que no son tareas.'
    const { toast } = useToast()

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
            </SheetContent>
        </Sheet>
    )
}
