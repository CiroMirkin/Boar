import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { columnModel } from "../models/column";
import { taskModel } from "../models/task";

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
    addColumn: (state, action: PayloadAction<columnModel>) => {
      state.columns.push(action.payload)
    },
    addTask: (state, action: PayloadAction<taskModel>) => {
      const columnIndex = action.payload.column ? (action.payload.column.columnIndex || 0) : 0
      state.columns[columnIndex].taskList.push(action.payload)
    },
  },
});

export const { addColumn } = columnsSlice.actions;
export default columnsSlice.reducer;
