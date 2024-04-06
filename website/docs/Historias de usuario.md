---
sidebar_position: 3
description: Historias de usuario
tags: 
  - Historias de usuario
---

# Historias de usuario

Esta son las historias de usuario implementadas actualmente en Boar.

## Tablero

* Como usuario, puedo crear tareas.
  * Puede crear tareas solo en la primer columna.
  * No puede crear tareas vacías, deben tener una descripción.
* Como usuario, puedo eliminar las tareas que quiera.
* Como usuario, puedo mover las tareas entre columnas.

## Archivo

* Como usuario, puedo archivar tareas.
  * Puede archivar todas las tareas de la ultima columna.
  * Puede ver las tareas archivadas.
  * El archivo es una lista con las tareas archivadas y la fecha en que se archivaron.
  * El archivo es diario. Si se archivan varias tareas el mismo dia, estas deberían archivarse juntas.
  * El archivo diario tiene capacidad para 30 tareas.
  * El archivo tiene capacidad para 60 días.
  * No se puede archivar una lista de tareas vacía.

## Preferencias

* Como usuario, puedo crear nuevas columnas.
* Como usuario, puedo eliminar columnas.
  * No puede eliminar columnas si solo hay tres.