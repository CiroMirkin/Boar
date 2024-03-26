import { archive } from "@/models/archive";
import { createSlice } from "@reduxjs/toolkit";

const initialState: archive = []

export const archiveSlice = createSlice({
    name: 'archive',
    initialState,
    reducers: {}
})

export default archiveSlice.reducer