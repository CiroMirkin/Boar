---
description: Crear una tarea
tags:
  - Tareas
  - Dominio
---

# Crear una tarea

**Reglas de negocio**:
* No se pueden crear tareas vacías.

## Función de dominio

La función `addTaskToThisColumn` implementa este caso de uso en el archivo `src\domainFunctions\addTask.ts`.

**Recibe** como parámetros el *id* de la columna a editar, la lista de columnas y la nueva tarea.
```typescript
columnId: string, 
columns: columnModel[], 
task: taskModel
```

**Retorna** una lista de columnas con la nueva tarea integrada.

```typescript
columnModel[]
```

**Lanza error** al estar vació el *id* de la nueva tarea recibida como parámetro.

### Implementación

Con la nueva lista de columnas se pueden actualizar las columnas.

```tsx
const newColumns = addTaskToThisColumn( columnId, columns, task )
setColumns(newColumns)
```

Se implementa en el componente `Boar` y para usar la función esta se encapsula dentro de otra, la cual se pasa a los componentes hijos. 

```tsx title="/src/components/Boar.tsx"
  const addNewTaskInColumn = (newTask: taskModel, columnId: string) => {
    // highlight-next-line
    const newColumns = addTaskToThisColumn(columnId, columns, newTask)
    // highlight-next-line
    setColumns(newColumns)
    toast.success('Tarea creada')
  }
```

## Pruebas

Se prueba a la función `addTaskToThisColumn` en el archivo `src\domainFunctions\addTask.test.ts`.

Puedes ejecutar las pruebas de la función con el siguiente comando.

```bash
npm run test src/domainFunctions/addTask.test.ts
```

:::info

Si el comando no funciona puedes probar dando vuelta los `/` o ejecutando todas las pruebas con el comando `npm run test`.