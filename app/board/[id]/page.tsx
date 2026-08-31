import { BoardPage } from "@/pages/BoardPage"

interface Props {
	params: Promise<{ id: string }>
}

export default async function BoardRoute({ params }: Props) {
	const { id } = await params

	return <BoardPage boardId={id} />
}
