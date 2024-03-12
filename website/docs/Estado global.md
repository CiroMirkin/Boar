---
sidebar_position: 5
description: Estado global
tags:
  - Estado global
  - Context
---

# Gestión del estado global

## ¿Donde esta la definición del estado global?

Se encuentra en el componente `App.tsx`.

## ¿Como se gestiona?

Para gestionar el estado global se utiliza un contexto que envuelve todo el contenido del componente `App`.

```jsx
<BoardData.Provider value={{
  board: getCopyOfTheBoardData(allBoardData),
  update: updateAllBoardData
  } as boardData}>

  {/* ... */}

</BoardData.Provider>
```

¿No sabes usar un  context? Puedes leer la [documentación oficial de React](https://react.dev/reference/react/useContext).

## ¿Puedo modificar el estado global directamente?

Respuesta corta: No.

```jsx
<BoardData.Provider value={{
  // highlight-next-line
  board: getCopyOfTheBoardData(allBoardData),
  update: updateAllBoardData
  } as boardData}>

  {/* ... */}

</BoardData.Provider>
```

Los componentes que usen el contexto global recibirán una copia del mismo, esto evita que lo puedan modificar directamente.

## ¿Como puedo modificar el estado global?

Puedes hacerlo a través de la propiedad `update`.

```jsx
<BoardData.Provider value={{
  board: getCopyOfTheBoardData(allBoardData),
  // highlight-next-line
  update: updateAllBoardData
  } as boardData}>

  {/* ... */}

</BoardData.Provider>
```

1. Esta propiedad `update` es una función.

```jsx
const updateAllBoardData = ({ action, task, column }: UpdateBoardDataParams): void => { }
```

2. Esta función recibe como parámetro una función (action) que se encarga de hacer el cambio que se quiere.

3. La función en el parámetro `action` debe retornar el nuevo estado global y generalmente estas están definidas en la carpeta `src/useCase`.

![Descripción de la gestión del estado global](/img/context.svg)
