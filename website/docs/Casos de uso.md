---
sidebar_position: 4
description: Casos de uso
tags: 
  - Casos de uso
  - Historias de usuario
---

# Casos de uso

1. Se crea una función básica en la carpeta `useCase`, una funcion que puede estar en la propiedad `action` del tipo `action`.

2. La función se implementa en el arreglo `taskOptions` en la propiedad `action`.

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