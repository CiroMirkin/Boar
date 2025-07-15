import { useTheme } from "@/App";
import { Archive } from "@/modules/taskList/archive/Archive";
import { Header } from "@/sharedByModules/Header/Header";
import { USER_IS_IN } from "@/sharedByModules/Header/userIsIn";
import { useTranslation } from "react-i18next";

export function ArchivePage() {
    const { bg } = useTheme()
    const { t } = useTranslation()
    return (
        <div className={bg}>
			<Header title={t('menu.archive')} whereUserIs={USER_IS_IN.ARCHIVE} />
            <Archive />
        </div>
    )
}