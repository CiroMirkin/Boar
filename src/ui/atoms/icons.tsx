import {
	Archive,
	Plus,
	CircleHelp,
	Columns3,
	Github,
	Menu,
	Settings,
	Languages,
	LogIn,
	LogOut,
	Pencil,
	Trash2,
	Bold,
	Italic,
	Underline,
	List,
	ListOrdered,
	Undo,
	Redo,
	Save,
	ArrowRight,
	ArrowLeft,
	Clipboard,
	CircleCheck,
	MessageSquareText,
	Clock4,
	Hourglass,
} from 'lucide-react'

const iconSize: string = '20'

interface IconProps {
	className?: string
	size?: string | number
}

export const PlusIcon = ({ className = '' }: IconProps) => (
	<Plus size={iconSize} className={className} />
)
export const ArchiveIcon = ({ className = '' }: IconProps) => (
	<Archive size={iconSize} className={className} />
)
export const CircleHelpIcon = ({ className = '' }: IconProps) => (
	<CircleHelp size={iconSize} className={className} />
)
export const GithubIcon = ({ className = '' }: IconProps) => (
	<Github size={iconSize} className={className} />
)
export const ColumnsIcon = ({ className = '', size = iconSize }: IconProps) => (
	<Columns3 size={size} className={className} />
)
export const MenuIcon = ({ className = '' }: IconProps) => (
	<Menu size={iconSize} className={className} />
)
export const SettingsIcon = ({ className = '' }: IconProps) => (
	<Settings size={iconSize} className={className} />
)
export const LanguagesIcon = ({ className = '' }: IconProps) => (
	<Languages size={iconSize} className={className} />
)
export const LogInIcon = ({ className = '' }: IconProps) => (
	<LogIn size={iconSize} className={className} />
)
export const LogOutIcon = ({ className = '' }: IconProps) => (
	<LogOut size={iconSize} className={className} />
)
export const PencilIcon = ({ className = '' }: IconProps) => (
	<Pencil size={iconSize} className={className} />
)
export const TrashIcon = ({ className = '' }: IconProps) => (
	<Trash2 size={iconSize} className={className} />
)
export const BoldIcon = ({ className = '' }: IconProps) => (
	<Bold size={iconSize} className={className} />
)
export const ItalicIcon = ({ className = '' }: IconProps) => (
	<Italic size={iconSize} className={className} />
)
export const UnderlineIcon = ({ className = '' }: IconProps) => (
	<Underline size={iconSize} className={className} />
)
export const ListIcon = ({ className = '' }: IconProps) => (
	<List size={iconSize} className={className} />
)
export const ListOrderedIcon = ({ className = '' }: IconProps) => (
	<ListOrdered size={iconSize} className={className} />
)
export const UndoIcon = ({ className = '' }: IconProps) => (
	<Undo size={iconSize} className={className} />
)
export const RedoIcon = ({ className = '' }: IconProps) => (
	<Redo size={iconSize} className={className} />
)
export const SaveIcon = ({ className = '' }: IconProps) => (
	<Save size={iconSize} className={className} />
)
export const ArrowRightIcon = ({ className = '' }: IconProps) => (
	<ArrowRight size={iconSize} className={className} />
)
export const ArrowLeftIcon = ({ className = '' }: IconProps) => (
	<ArrowLeft size={iconSize} className={className} />
)
export const ClipboardIcon = ({ className = '' }: IconProps) => (
	<Clipboard size={iconSize} className={className} />
)
export const CheckIcon = ({ className = '' }: IconProps) => (
	<CircleCheck size={iconSize} className={className} />
)
export const MessageSquareTextIcon = ({ className = '' }: IconProps) => (
	<MessageSquareText size={iconSize} className={className} />
)
export const ClockIcon = ({ className = '' }: IconProps) => (
	<Clock4 size={iconSize} className={className} />
)
export const HourglassIcon = ({ className = '' }: IconProps) => (
	<Hourglass size={iconSize} className={className} />
)
