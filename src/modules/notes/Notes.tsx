import { Button } from "@/ui/button";
import { ScrollArea } from "@/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/ui/sheet";
import { AutoExpandTextarea } from "./AutoExpandTextarea";
import { useToast } from "@/ui/use-toast";
import { useSaveNotes } from "./repository/useSavedNote";
import { useSession } from "@/SessionProvider";
import { useEffect, useState } from "react";
import { getNotesFromSupabase } from "./repository/getNotesFromSupabase";
import { defaultNotes, maxLengthOfNotes, type Notes } from "./model/notes";
import LocalStorageNotesRepository from "./repository/LocalStorageNotesRepository";
import { useTranslation } from "react-i18next";

export default function Notes() {
    const [text, setText] = useState(defaultNotes as Notes)
    const { t } = useTranslation()
    const placeholder = t('notes.input_placeholder')
    const { session } = useSession()
    const { toast } = useToast()

    useEffect(() => {
        if(!!session) {
            getNotesFromSupabase({ setNotes: setText })
        }
        else {
            const lg = new LocalStorageNotesRepository()
            const notesFromLocalStotage = lg.getAll()
            notesFromLocalStotage == defaultNotes 
                ? lg.save(text) 
                : setText(notesFromLocalStotage)
        }
    }, [session])

    const onChange = (newText: Notes) => {
        if(newText.trim().length <= maxLengthOfNotes) {
            setText(newText)
            return;
        }

        toast({
            description: t('notes.warning_length_toast'),
            variant: 'destructive',
        })
    }

    const handleSaveNotes = () => {
        useSaveNotes({ session, notes: text })
        toast({
            description: t('notes.successful_toast')
        })
    }

    return (
        <Sheet onOpenChange={(isOpen) => !isOpen && handleSaveNotes()}>
            <SheetTrigger asChild>
                <Button variant='link'>{ t('notes.action_title') }</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{ t('notes.section_title') }</SheetTitle>
                    <SheetDescription aria-describedby="sheet-description">{ t('notes.description') }</SheetDescription>
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
                    <Button onClick={handleSaveNotes}>{ t('notes.save_btn') }</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
