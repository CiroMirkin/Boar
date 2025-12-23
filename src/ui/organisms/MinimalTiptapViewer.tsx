'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import { cn } from '@/lib/utils'

interface MinimalTiptapViewerProps {
	value?: string
	className?: string
	editorContentClassName?: string
	maxRows?: number
}

const MinimalTiptapViewer = ({
	value,
	className,
	editorContentClassName,
	maxRows = 50,
}: MinimalTiptapViewerProps) => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Placeholder.configure({
				placeholder: '',
			}),
			Highlight.configure({ multicolor: true }),
		],
		content: value,
		editable: false,
		editorProps: {
			attributes: {
				class: 'focus:outline-none',
			},
		},
	})

	if (!editor) return null

	const lineHeight = 20 // px
	const paddingVertical = 22 // px

	const editorStyle = {
		minHeight: `40px`,
		maxHeight: `${maxRows * lineHeight + paddingVertical}px`,
		wordBreak: 'break-word' as const,
		overflowWrap: 'break-word' as const,
	}

	return (
		<div
			className={cn(
				'w-full! mx-auto border rounded-lg bg-background',
				'border-gray-300 dark:border-gray-700 transition-colors',
				className
			)}
		>
			<EditorContent
				editor={editor}
				className={cn(
					'p-4 prose prose-sm max-w-none custom-scrollbar text-base overflow-y-auto',
					'[&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6',
					'[&_li]:marker:text-foreground',
					editorContentClassName
				)}
				style={editorStyle}
			/>
		</div>
	)
}

export { MinimalTiptapViewer }
