---
description: Eliminar una tarea 
tags: 
  - Tareas
  - Dominio
---

# Eliminar una tarea

## Función de dominio

La función `deleteThisTaskFromThisColumn` implementa este caso de uso en el archivo `src\domainFunctions\deleteTask.ts`.

**Recibe** como parámetros el *id* de la tarea a eliminar, el *id* de la columna donde esta la tarea y la lista de columnas.
```typescript
taskId: string, 
columnId: string, 
columns: columnModel[]
```

**Retorna** una lista de tareas con la tarea ya eliminada.

```typescript
columnModel[]
```

**Lanza error** cuando el *id* de la tarea o de a columna están en blanco y cuando la columna donde se encuentra la tarea esta vacía antes de eliminar la tarea.

### Implementación

Con la nueva lista de columnas se pueden actualizar las columnas.

```tsx
const newColumns = deleteThisTaskFromThisColumn(taskId, columnId, columns)
setColumns(newColumns)
```

Se implementa en el componente `Boar` y para usar la función esta se encapsula dentro de otra, la cual se pasa a los componentes hijos. 

```tsx title="/src/components/Boar.tsx"
const deleteThisTaskInThisColumn = (taskId: string, columnId: string) => {
    // highlight-next-line
    const newColumns = deleteThisTaskFromThisColumn(taskId, columnId, columns)
    // highlight-next-line
    setColumns(newColumns)
    toast.success('Tarea eliminada')
}
```

## Pruebas

Se prueba a la función `deleteThisTaskFromThisColumn` en el archivo `src\domainFunctions\deleteTask.test.ts`.

Puedes ejecutar las pruebas de la función con el siguiente comando.

```bash
npm run test src/domainFunctions/deleteTask.test.ts
```

:::info

Si el comando no funciona puedes probar dando vuelta los `/` o ejecutando todas las pruebas con el comando `npm run test`.