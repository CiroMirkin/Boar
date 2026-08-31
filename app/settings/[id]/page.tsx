import { Settings } from '@/pages/Settings'

interface Props {
	params: Promise<{ id: string }>
}

export default async function SettingsRoute({ params }: Props) {
	const { id } = await params

	return <Settings boardId={id} />
}
