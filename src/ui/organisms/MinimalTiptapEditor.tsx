'use client'

import * as React from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import { Button } from '@/ui/atoms/button'
import { Separator } from '@/ui/atoms/separator'
import { Toggle } from '@/ui/atoms/toggle'
import {
	Bold,
	Italic,
	Underline as UnderlineIcon,
	List,
	ListOrdered,
	Undo,
	Redo,
	Save,
	Heading1,
	Heading2,
	Heading3,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface MinimalTiptapProps {
	value?: string
	onChange?: (value: string) => void
	onBlur?: () => void
	className?: string
	editable?: boolean
	placeholder?: string
	editorContentClassName?: string
	rows?: number
	maxRows?: number
	saveTextCallback?: () => void
}

const MinimalTiptapEditor = ({
	value,
	onChange,
	onBlur,
	className,
	editable = true,
	placeholder = 'Type something...',
	editorContentClassName,
	rows = 3,
	maxRows = 10,
	saveTextCallback = () => {},
}: MinimalTiptapProps) => {
	const [isFocused, setIsFocused] = React.useState(false)

	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Placeholder.configure({
				placeholder,
			}),
		],
		content: value,
		editable,
		onUpdate: ({ editor }) => {
			onChange?.(editor.getHTML())
		},
		editorProps: {
			attributes: {
				class: 'focus:outline-none',
				spellcheck: 'false',
				autocorrect: 'off',
				autocapitalize: 'off',
			},
		},
		onFocus: () => setIsFocused(true),
		onBlur: () => {
			setIsFocused(false)
			onBlur?.()
		},
	})

	if (!editor) return null

	// Approximate line height and padding (adjust as needed)
	const lineHeight = 20 // px
	const paddingVertical = 32 // 2 * 16px for p-4

	const editorStyle = {
		minHeight: `${rows * lineHeight + paddingVertical}px`,
		maxHeight: `${maxRows * lineHeight + paddingVertical}px`,
		wordBreak: 'break-word' as const,
		overflowWrap: 'break-word' as const,
	}

	return (
		<div
			className={cn(
				'w-full mx-auto border rounded-lg bg-background',
				'border-gray-300 dark:border-gray-700 transition-colors',
				isFocused && 'border-foreground/60 ring-3 ring-foreground/10',
				className
			)}
		>
			{editable && (
				<div className='flex flex-wrap items-center gap-1 p-1 border-b bg-muted/50'>
					{/* Basic formatting */}
					<Toggle
						pressed={editor.isActive('bold')}
						onPressedChange={() => editor.chain().focus().toggleBold().run()}
						aria-label='Negrita'
					>
						<Bold size={16} />
					</Toggle>
					<Toggle
						pressed={editor.isActive('italic')}
						onPressedChange={() => editor.chain().focus().toggleItalic().run()}
						aria-label='Itálica'
					>
						<Italic size={16} />
					</Toggle>
					<Toggle
						pressed={editor.isActive('underline')}
						onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
						aria-label='Subrayado'
					>
						<UnderlineIcon size={16} />
					</Toggle>

					<Separator orientation='vertical' className='mx-2 h-6' />

					<Toggle
						pressed={editor.isActive('heading', { level: 1 })}
						onPressedChange={() =>
							editor.chain().focus().toggleHeading({ level: 1 }).run()
						}
					>
						<Heading1 size={16} />
					</Toggle>
					<Toggle
						pressed={editor.isActive('heading', { level: 2 })}
						onPressedChange={() =>
							editor.chain().focus().toggleHeading({ level: 2 }).run()
						}
					>
						<Heading2 size={16} />
					</Toggle>
					<Toggle
						pressed={editor.isActive('heading', { level: 3 })}
						onPressedChange={() =>
							editor.chain().focus().toggleHeading({ level: 3 }).run()
						}
					>
						<Heading3 size={16} />
					</Toggle>

					<Separator orientation='vertical' className='mx-2 h-6' />

					{/* Lists */}
					<Toggle
						pressed={editor.isActive('bulletList')}
						onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
						aria-label='Lista desordenada'
					>
						<List size={16} />
					</Toggle>
					<Toggle
						pressed={editor.isActive('orderedList')}
						onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
						aria-label='Lista ordenada'
					>
						<ListOrdered size={16} />
					</Toggle>

					<Separator orientation='vertical' className='mx-2 h-6' />

					{/* History */}
					<Button
						variant='ghost'
						size='icon'
						onClick={() => editor.chain().focus().undo().run()}
						disabled={!editor.can().undo()}
						aria-label='Deshacer'
					>
						<Undo size={16} />
					</Button>
					<Button
						variant='ghost'
						size='icon'
						onClick={() => editor.chain().focus().redo().run()}
						disabled={!editor.can().redo()}
						aria-label='Rehacer'
					>
						<Redo size={16} />
					</Button>

					<Separator orientation='vertical' className='mx-2 h-6' />

					{/* Save */}
					<Button
						variant='ghost'
						size='icon'
						onClick={saveTextCallback}
						aria-label='Guardar texto'
					>
						<Save size={16} />
					</Button>
				</div>
			)}
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

export { MinimalTiptapEditor }
