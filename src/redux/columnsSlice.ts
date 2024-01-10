import { createSlice } from "@reduxjs/toolkit";
import { columnModel } from "../models/column";

interface initialStateInterface {
  columns: columnModel[]
}

const initialState: initialStateInterface = {
  columns: [
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
  ]
};

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    addColumn: (state, action) => {
      
    },
  },
});

export const { addColumn } = columnsSlice.actions;
export default columnsSlice.reducer;
