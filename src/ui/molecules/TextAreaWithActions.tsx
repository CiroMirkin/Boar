import { useEffect, useRef, useCallback, KeyboardEvent, MouseEvent } from "react"
import { Textarea } from "@/ui/atoms/textarea"
import { cn } from "@/lib/utils"
import {
    Plus,
} from "lucide-react"

interface UseAutoResizeTextareaProps {
    minHeight: number
    maxHeight?: number
}

function useAutoResizeTextarea({
    minHeight,
    maxHeight,
}: UseAutoResizeTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const adjustHeight = useCallback(
        (reset?: boolean) => {
            const textarea = textareaRef.current
            if (!textarea) return

            if (reset) {
                textarea.style.height = `${minHeight}px`
                return
            }

            // Temporarily shrink to get the right scrollHeight
            textarea.style.height = `${minHeight}px`

            // Calculate new height
            const newHeight = Math.max(
                minHeight,
                Math.min(
                    textarea.scrollHeight,
                    maxHeight ?? Number.POSITIVE_INFINITY
                )
            )

            textarea.style.height = `${newHeight}px`
        },
        [minHeight, maxHeight]
    )

    useEffect(() => {
        // Set initial height
        const textarea = textareaRef.current
        if (textarea) {
            textarea.style.height = `${minHeight}px`
        }
    }, [minHeight])

    // Adjust height on window resize
    useEffect(() => {
        const handleResize = () => adjustHeight()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [adjustHeight])

    return { textareaRef, adjustHeight }
}

interface TeaxtareaWithActions {
    value: string
    id?: string
    onChange?: (value: string) => void
    onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
    placeholder?: string
    btnTitle?: string
    btnDisabled?: boolean
}

export function TeaxtareaWithActions({ 
    value, 
    id = 'textarea',
    onChange = () => {}, 
    onKeyDown = () => {}, 
    placeholder = '...',
    onClick = () => {},
    btnTitle = '',
    btnDisabled = false,
}: TeaxtareaWithActions) {
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 30,
        maxHeight: 200,
    })

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        onKeyDown(e)
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault()
            if (value.trim()) {
                adjustHeight(true)
            }
        }
    }

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto space-y-8">
            <div className="w-full">
                <div className="relative bg-white rounded-lg">
                    <div className="overflow-y-auto">
                        <Textarea
                            id={id}
                            ref={textareaRef}
                            value={value}
                            onChange={(e) => {
                                onChange(e.target.value)
                                adjustHeight()
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder={placeholder}
                            className={cn(
                                "w-full p-3 pb-0",
                                "resize-none",
                                "bg-transparent",
                                "border-none",
                                "text-black text-lg",
                                "focus:outline-none",
                                "focus-visible:ring-0 focus-visible:ring-offset-0",
                                "placeholder:text-neutral-500 placeholder:text-base",
                                "min-h-[30px]"
                            )}
                            style={{
                                overflow: "hidden",
                            }}
                        />
                    </div>

                    <footer className="flex items-center justify-between p-2">
                        <div className="flex items-center gap-2">
                            {/* <button
                                type="button"
                                className="group p-2 hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-1"
                            >
                                <Paperclip className="w-4 h-4 text-white" />
                                <span className="text-xs text-zinc-400 hidden group-hover:inline transition-opacity">
                                    Attach
                                </span>
                            </button> */}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                title={btnTitle}
                                disabled={btnDisabled}
                                onClick={(e) => {
                                    onClick(e)
                                    adjustHeight(true)
                                }}
                                className={cn(
                                    "px-1.5 py-1.5 rounded-lg text-sm transition-colors border border-zinc hover:border-black flex items-center justify-between gap-1 disabled:opacity-50 disabled:pointer-events-none"
                                )}
                            >
                                <Plus
                                    className={cn(
                                        "w-5.5 h-5.5 md:w-5 md:h-5"
                                    )}
                                />
                                <span className="sr-only">Add</span>
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    )
}

