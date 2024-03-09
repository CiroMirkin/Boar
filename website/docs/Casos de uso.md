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

Gestión del estado global:

![Descripción de la gestión del estado global](/img/context.svg)

## Historias de usuario

### Tablero

1. Como usuario, puedo crear tareas.
  * Puede crear tareas solo en la primer columna.
2. Como usuario, puedo eliminar las tareas que quiera.
3. Como usuario, puedo mover las tareas entre columnas.

### Historial

* Como usuario, puedo archivar tareas.
  * Puede archivar todas las tareas de una columna.
  * Puede archivar todas las tareas de la ultima columna.
  * Puede ver las tareas archivadas.
  * El archivo es una lista con las tareas archivadas y la fecha en que se archivaron.

### Preferencias

* Como usuario, puedo cambiar el nombre del tablero.
  * El tablero debe tener un nombre.
* Como usuario, puedo cambiar el nombre de las columnas.
  * Las columnas deben tener un nombre.