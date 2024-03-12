---
sidebar_position: 4
description: Casos de uso
tags: 
  - Casos de uso
  - Historias de usuario
  - Estado global
  - Context
---

# Casos de uso

## ¿Donde encuentro la lógica de un caso de uso?

Los casos de uso están en la carpeta `useCase`.

## Crear un nuevo caso de uso

1. Se crea una función en la carpeta `useCase`.

2. La función tiene que retornar el tipo `board`.

3. La función tiene que tener como parámetro la interfaz `boardUseCaseParams` o alguna otra que se extienda de esta definida en `src/useCase/useCase.ts`.

## Implementación de una función de caso de uso

Para usar las funciones de este tipo tienen que pasarse como parámetro a la función del contexto global `update` que tiene la propiedad `action`.

:::warning
  Cuando se pasa una función en el propiedad `action` se pasa sin paréntesis.

  ```jsx
  updateBoard({
    action: deleteThisTask,
    task,
  })
  // Como se puede apreciar la "entidad" sobre la que actúa un caso de uso se pasa por separado.
  ```
:::

:::info
El contexto global se encuentra en el componente `App.tsx`.
:::
