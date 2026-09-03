import { create } from 'zustand'

type BoardIdStore = {
	board_id: string
	setBoardId: (id: string) => void
}

export const useBoardId = create<BoardIdStore>((set) => ({
	board_id: '',
	setBoardId: (id: string) => {
		set(() => ({ board_id: id }))
	},
}))
