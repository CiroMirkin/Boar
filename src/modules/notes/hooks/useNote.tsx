import { useContext } from 'react'
import { NoteContext } from '../contexts/NoteProvider'

export const useNote = () => useContext(NoteContext)
