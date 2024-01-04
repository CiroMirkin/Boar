---
description: Editar una tarea
tags:
  - Tareas
  - Edición
  - Dominio
---

# Editar Una tarea

Un usuario puede editar la descripción de una tarea.

## Función de dominio

La función `editThisTask` implementa este caso de uso en el archivo `src\domainFunctions\editTask.ts`.

**Recibe** como parámetro:

```typescript
taskId: string,
newTaskText?: string,
columns: columnModel[]
```

**Retorna** una lista de columnas con la tarea ya editada.

```typescript
columnModel[]
```

**Lanza error** al no encontrar la tarea que se le pidió editar.

### Implementación

Con la nueva lista de columnas se pueden actualizar las columnas.

```tsx
const newColumns = editThisTask({ taskId, columns, newTaskText })
setColumns(newColumns)
```

Se implementa en el componente `Boar` y para usar la función esta se encapsula dentro de otra, la cual se pasa a los componentes hijos. 

```tsx title="/src/components/Boar.tsx"
const editTask = (taskId: string, newTaskText: string) => {
  // highlight-next-line
  const newColumns = editThisTask({ taskId, columns, newTaskText })
  setColumns(newColumns)
  // highlight-next-line
  toast.success('Tarea editada')
}
```

Recorrido de la función `editTask`:

Boar > TaskList > Task > TaskOptions


## Pruebas

Se prueba a la función `deleteThisColumnFromColumns` en el archivo `src\domainFunctions\editTask.test.ts`.

Puedes ejecutar las pruebas de la función con el siguiente comando.

```bash
npm run test src/domainFunctions/editTask.test.ts
```

:::info

Si el comando no funciona puedes probar dando vuelta los `/` o ejecutando todas las pruebas con el comando `npm run test`.