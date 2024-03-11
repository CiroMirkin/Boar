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

1. Se crea una función en la carpeta `useCase`.

2. Esta tiene que retornar el tipo `board`.

3. Esta en su parámetro tiene que usar la interfaz `boardUseCaseParams` o alguna otra que se extienda de esta.

4. Las función de este tipo pueden usare pasándose como parámetro a la función global `updateAllBoardData` que esta disponible en el contexto del componente App.
