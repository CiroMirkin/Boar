---
sidebar_position: 5
description: Estado global
tags:
  - Estado global
  - Redux
---

# Gestión del estado global (Redux)

Para la gestión del estado global se utiliza [Redux Toolkit](https://redux-toolkit.js.org/).

## ¿Donde esta la definición del estado global?

Se encuentra dentro de la carpeta `src/redux`, dentro de esta carpeta esta la definición de cada porción del estado global.

Puedes modificar el estado global a través de los *Reducers* de Redux, los cuales están definidos de la siguiente forma.

```js title="/src/redux/taskListInEachColumnReducer.ts"
// ...
export const taskListInEachColumnSlice = createSlice({
  name: 'taskListInEachColumn',
  initialState,
  reducers: {
    // highlight-next-line
    deleteTask: (state, action: PayloadAction<taskModel>) => {
      // highlight-next-line
      const task = action.payload
      // highlight-next-line
      state.list = deleteThisTask({ taskListInEachColumn: state.list, task })
      // highlight-next-line
    },
  }
})

export const { deleteTask /* ...*/ } = taskListInEachColumnSlice.actions
```

### action y payload

```js 
reducers: {
  // highlight-next-line
  deleteTask: (state, action: PayloadAction<taskModel>) => {
    // highlight-next-line
    const task = action.payload
    state.list = deleteThisTask({ taskListInEachColumn: state.list, task })
  },
}
```

El action y payload son la información que el *Reducer* recibe, en esta caso es una tarea (*task*).

### state

El *state* es estado global actual.

```js 
reducers: {
  // highlight-next-line
  deleteTask: (state, action: PayloadAction<taskModel>) => {
    const task = action.payload
    // highlight-next-line
    state.list = deleteThisTask({ taskListInEachColumn: state.list, task })
  },
}
```
Primero **igualamos** el estado actual al retorno de la función `deleteThisTask`, esi definimos cual sera el nuevo valor del nuevo estado global.

Dentro de la función `deleteThisTask` estamos **pasando como argumento** el valor del estado global actual.

:::info
La función `deleteThisTask` esta definida dentro de la carpeta `src/useCase/task`.
:::

## ¿Como puedo usar un Reducer?

Ejemplo:

```jsx
// highlight-next-line
const dispatch = useDispatch()
const descriptionText = 'Hacer un cafe.'

const handleClick = () => {
  const task = getNewTask({ descriptionText, columnPosition: '1'})
  // highlight-next-line
  dispatch(addTaskAtFirstColumn(task))
}
```

:::warning
La función `addTaskAtFirstColumn` **es** un *Reducer* dentro de la carpeta `redux`.

La función `addTaskAtFirstColumn` **no es** una función dentro la carpeta `useCase`.
:::