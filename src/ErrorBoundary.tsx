import { Component, ErrorInfo, ReactNode } from "react"
import { Button } from "./ui/atoms/button"

interface ErrorBoundaryState {
    hasError: boolean
}

interface ErrorBoundaryProps {
    children: ReactNode
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log('ERROR: ', error)
        console.log('Error Info: ', errorInfo)
    }

    render() {
        if(this.state.hasError) {
            return (
                <div className="w-full p-20">
                    <p>Lo sentimos. Hubo un error inesperado. &#x1F641;</p>
                    <a href='https://github.com/CiroMirkin/Boar/issues' target='_blank'>
						<Button variant='link' className='pl-0'>Reportar en GitHub</Button>
					</a>
                </div>
            )
        }

        return this.props.children
    }
} 

export default ErrorBoundary