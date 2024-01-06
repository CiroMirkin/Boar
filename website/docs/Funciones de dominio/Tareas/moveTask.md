---
description: Mover una tarea
tags:
  - Tareas
  - Dominio
---

# Mover una tarea

Mover una tarea a la siguiente o anterior columna.

## Función de dominio

La función `moveTask` implementa este caso de uso en el archivo `src\domainFunctions\moveTask.ts`.

**Recibe** como parámetros:
```typescript
interface moveTaskParams {
    taskId: string,
    to: moveToType,
    columns: columnsType
}
```

**Retorna** una lista de columnas con la tarea ya cambiada de lugar.

```typescript
columnModel[]
```

**No contiene excepciones**.

### Implementación

Con la nueva lista de columnas se pueden actualizar las columnas.

```tsx
const newColumns = moveTask({to, columns, taskId})
setColumns(newColumns)
```

Se implementa en el componente `Boar` y para usar la función esta se encapsula dentro de otra, la cual se pasa a los componentes hijos. 

```tsx title="/src/components/Boar.tsx"
const moveATask = (to: moveToType, taskId: string) => {
    const newColumns = moveTask({to, columns, taskId})
    setColumns(newColumns)
}
```

Recorrido de la función `moveATask` definida en el componente `Boar`:

Boar > TaskList > Task > TaskOptions

## Pruebas

Se prueba a la función `moveTask` en el archivo `src\domainFunctions\moveTask.test.ts`.

Puedes ejecutar las pruebas de la función con el siguiente comando.

```bash
npm run test src/domainFunctions/moveTask.test.ts
```

:::info

Si el comando no funciona puedes probar dando vuelta los `/` o ejecutando todas las pruebas con el comando `npm run test`.