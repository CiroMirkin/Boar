import { Button } from "@/ui/button";
import { ScrollArea } from "@/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/ui/sheet";
import { useToast } from "@/ui/use-toast";
import { useSaveNotes } from "./repository/useSavedNote";
import { useSession } from "@/SessionProvider";
import { useEffect, useState } from "react";
import { getNotesFromSupabase } from "./repository/getNotesFromSupabase";
import { defaultNotes, maxLengthOfNotes, type Notes } from "./model/notes";
import LocalStorageNotesRepository from "./repository/LocalStorageNotesRepository";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/sharedByModules/Theme/ThemeContext";
import RichTextEditor from "./RichTextEditor/RichTextEditor";

export default function Notes() {
    const [text, setText] = useState(defaultNotes as Notes)
    const { t } = useTranslation()
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

    const { column, text: textColor } = useTheme()

    return (
        <Sheet onOpenChange={(isOpen) => !isOpen && handleSaveNotes()}>
            <SheetTrigger asChild>
                <Button variant='link' className="text-base">{ t('notes.action_title') }</Button>
            </SheetTrigger>
            <SheetContent className={column}>
                <SheetHeader className={textColor}>
                    <SheetTitle>{ t('notes.section_title') }</SheetTitle>
                    <SheetDescription aria-describedby="sheet-description">{ t('notes.description') }</SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-full">
                    <main className="p-2 text-base">
                        <RichTextEditor
                            value={text}
                            onChange={onChange}
                            rows={5}
                            maxRows={18}
                            saveTextCallback={handleSaveNotes}
                        />
                    </main>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
