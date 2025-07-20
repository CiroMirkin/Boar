import { useTheme } from "@/App";
import LibraryOfArchiveNotes from "@/modules/notes/LibraryOfArchiveNotes/LibraryOfArchivedNotes";
import { Archive } from "@/modules/taskList/archive/Archive";
import { Header } from "@/sharedByModules/Header/Header";
import { USER_IS_IN } from "@/sharedByModules/Header/userIsIn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { useTranslation } from "react-i18next";

export function ArchivePage() {
    const { bg } = useTheme()
    const { t } = useTranslation()
    return (
        <div className={bg + " flex flex-col items-center"}>
			<Header title={t('menu.archive')} whereUserIs={USER_IS_IN.ARCHIVE} />
            <Tabs defaultValue="tareas-archivadas">
                <TabsList className="self-center justify-self-stretch">
                    <TabsTrigger value="tareas-archivadas" >Tareas</TabsTrigger>
                    <TabsTrigger value="notas-archivadas" >Notas</TabsTrigger>
                </TabsList>
                <TabsContent value="tareas-archivadas">
                    <Archive />
                </TabsContent>
                <TabsContent value="notas-archivadas">
                    <LibraryOfArchiveNotes />
                </TabsContent>
            </Tabs>
        </div>
    )
}