import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { ArchivedNote as ArchivedNoteModel } from "../model/archivedNote";
import { format } from "@formkit/tempo";
import { useTheme } from "@/App";
import RichTextViewer from "../../RichTextEditor/RichTextViewer";

interface ArchivedNoteProps {
    note: ArchivedNoteModel
}

export default function ArchivedNote({ note }: ArchivedNoteProps) {
    const { column, task, text } = useTheme()
    const archivedNoteClassName = `${column} ${text} border-none max-w-2xl rounded-lg`
    return (
        <Card className={archivedNoteClassName}>
            <CardHeader>
                <CardTitle>
                    { format(note.date, { date: 'full' }) }
                </CardTitle>
            </CardHeader>
            <CardContent className="h-auto">
                <RichTextViewer value={note.note} className={task} />
            </CardContent>
        </Card>
    )
}