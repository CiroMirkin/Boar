import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { columnModel } from "../models/column";
import { taskModel } from "../models/task";
import { deleteThisColumnFromColumns } from "../domainFunctions/deleteColumn";
import { deleteThisTaskFromThisColumn } from "../domainFunctions/deleteTask";
import { moveThisTask, moveToType } from "../domainFunctions/moveTask";

export interface moveTaskPayloadAction { taskId: string, to: moveToType }

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
          id: "1",
          column: {
            columnId: "1",
            columnIndex: 0
          }
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
      const columnIndex = action.payload.column.columnIndex
      state.columns[columnIndex].taskList.push(action.payload)
    },
    deleteColumn: (state, action: PayloadAction<string>) => {
      state.columns = deleteThisColumnFromColumns({ columnId: action.payload, columns: state.columns })
    },
    deleteTask: (state, action: PayloadAction<taskModel>) => {
      const taskId = action.payload.id
      const columnId = action.payload.column.columnId
      if(columnId) {
        state.columns = deleteThisTaskFromThisColumn(taskId, columnId, state.columns)
      }
    },
    moveTask: (state, action: PayloadAction<moveTaskPayloadAction>) => {
      const taskId = action.payload.taskId
      const to = action.payload.to
      state.columns = moveThisTask({ taskId, to, columns: state.columns })
    },
  },
});

export const { addColumn, addTask, deleteColumn, deleteTask, moveTask } = columnsSlice.actions;
export default columnsSlice.reducer;
