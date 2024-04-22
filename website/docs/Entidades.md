---
description: Entidades
tags: 
  - Entidades
  - Dominio
  - ColumnList
  - TaskListInEachColumn
---

# Entidades

La definiciones de las entidades están en la carpeta `models`.

## ColumnList y TaskListInEachColumn

Las columnas se almacenan en un arreglo, en un arreglo diferente se almacenan las listas de tareas asociadas a estas columnas.

La primera  lista dentro del arreglo *TaskListInEachColumn* corresponden a la primera columna en el arreglo *ColumnList*.

:::danger
Estos dos arreglos deben mantener una consistencia, si hay mas o menos elementos en alguno de los dos arreglos habrá errores. Esto porque su relación es a través de las posiciones.
:::