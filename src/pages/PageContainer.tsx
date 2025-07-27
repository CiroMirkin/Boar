import { useTheme } from "@/App"
import { Header } from "@/sharedByModules/Header/Header"
import { USER_IS_IN } from "@/sharedByModules/Header/userIsIn"
import { ReactNode } from "react"

interface PageContainerProps {
    children: ReactNode
    whereUserIs: USER_IS_IN
    title?: string
    className?: string
}

export default function PageContainer({ children, whereUserIs, title = 'Boar', className = '' }: PageContainerProps) {
    const { bg, text } = useTheme()
    return (
        <div className={`${bg} ${text}`}>
            <Header title={title} whereUserIs={whereUserIs} />
            <main 
                className={`w-full min-h-[calc(100vh-5rem)] grid place-items-center ${className}`}
            >
                { children }
            </main>
        </div>
    )
}