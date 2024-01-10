import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
      name: "Pendientes",
      id: "1",
      taskList: [
        {
          descriptionText: "Hacer un cafe.",
          id: "1"
        },
      ]
    },
    {
      name: "Procesando",
      id: "2",
      taskList: []
    },
    {
      name: "Terminado",
      id: "3",
      taskList: []
    },
];

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    addColumn: (state, action) => {
      console.log(state, action.payload)
    },
  },
});

export const { addColumn } = columnsSlice.actions;
export default columnsSlice.reducer;
