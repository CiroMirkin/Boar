import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { columnModel } from "../models/column";
import { taskModel } from "../models/task";
import { deleteThisColumnFromColumns } from "../domainFunctions/deleteColumn";
import { deleteThisTaskFromThisColumn } from "../domainFunctions/deleteTask";
import { moveTask, moveToType } from "../domainFunctions/moveTask";

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
    deleteColumn: (state, action: PayloadAction<string>) => {
      state.columns = deleteThisColumnFromColumns({ columnId: action.payload, columns: state.columns })
    },
    deleteTask: (state, action: PayloadAction<taskModel>) => {
      const taskId = action.payload.id
      const columnId = action.payload.column ? (action.payload.column.columnId || '') : ''
      if(columnId) {
        state.columns = deleteThisTaskFromThisColumn(taskId, columnId, state.columns)
      }
    },
    moveTask: (state, action: PayloadAction<{ taskId: string, to: moveToType }>) => {
      const taskId = action.payload.taskId
      const to = action.payload.to
      state.columns = moveTask({ taskId, to, columns: state.columns })
    },
  },
});

export const { addColumn } = columnsSlice.actions;
export default columnsSlice.reducer;
