import LibraryOfArchiveNotes from "@/modules/notes/LibraryOfArchiveNotes/LibraryOfArchivedNotes";
import { ArchivedTasks } from "@/modules/taskList/ArchivedTasks/ArchivedTasks";
import { USER_IS_IN } from "@/modules/Header/userIsIn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/atoms/tabs";
import { useTranslation } from "react-i18next";
import PageContainer from "./PageContainer";

export function BoardArchive() {
    const { t } = useTranslation()
    return (
        <PageContainer 
            title={t('menu.archive')} 
            whereUserIs={USER_IS_IN.ARCHIVE} 
            className="flex flex-col items-center"
        >
            <Tabs defaultValue="tareas-archivadas">
                <TabsList className="self-center justify-self-stretch">
                    <TabsTrigger value="tareas-archivadas" >{ t('archive_page.tasks') }</TabsTrigger>
                    <TabsTrigger value="notas-archivadas" >{ t('archive_page.notes') }</TabsTrigger>
                </TabsList>
                <TabsContent value="tareas-archivadas">
                    <ArchivedTasks />
                </TabsContent>
                <TabsContent value="notas-archivadas">
                    <LibraryOfArchiveNotes />
                </TabsContent>
            </Tabs>
        </PageContainer>
    )
}