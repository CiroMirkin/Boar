---
sidebar_position: 4
description: Casos de uso
tags: 
  - Casos de uso
  - Historias de usuario
  - Estado global
  - Redux
---

# Casos de uso

## ¿Donde encuentro la lógica de un caso de uso?

La lógica de los casos de uso esta en la carpeta `useCase`.

## Crear un nuevo caso de uso

1. Se crea una función en la carpeta `useCase`.

## Implementación de una función de caso de uso

Los casos de uso se implementan a través de Redux toolkit en la carpeta `src/redux`.

Ejemplo de la implementación de la lógica del caso de uso eliminar tarea (*deleteThisTask*) :

```js title="/src/redux/taskListInEachColumnReducer.ts"
// ...

export const taskListInEachColumnSlice = createSlice({
  name: 'taskListInEachColumn',
  initialState,
  reducers: {
    deleteTask: (state, action: PayloadAction<taskModel>) => {
      const task = action.payload
      // highlight-next-line
      state.list = deleteThisTask({ taskListInEachColumn: state.list, task })
    },
  }
})

// ...
```
