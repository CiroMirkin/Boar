---
description: Eliminar una columna
tags:
  - Columnas
  - Dominio
---

# Eliminar una columna

**Reglas de negocio**:
* Solo se puede eliminar una columna si hay más de tres en la tabla.

## Función de dominio

La función `deleteThisColumnFromColumns` implementa este caso de uso en el archivo `src\domainFunctions\deleteColumn.ts`.

**Recibe** como parámetros el *id* de la columna a eliminar y la lista de columnas.
```typescript
columnId: string,
columns: columnModel[]
```

**Retorna** una lista de columnas con una columna menos si la lista de columnas que recibió tienen más de tres elementos.

```typescript
columnModel[]
```

**Lanza error** al recibir una lista de columnas con menos de tres elementos.

### Implementación

Con la nueva lista de columnas se pueden actualizar las columnas.

```tsx
const newColumns = deleteThisColumnFromColumns({ columnId, columns })
setColumns(newColumns)
```

Se implementa en el componente `Boar` y para usar la función esta se encapsula dentro de otra, la cual se pasa a los componentes hijos. 

```tsx title="/src/components/Boar.tsx"
const deleteColumn = (columnId: string) => {
  try {
    // highlight-next-line
    const newColumns = deleteThisColumnFromColumns({ columnId, columns })
    // highlight-next-line
    setColumns(newColumns)
    toast.success('Columna eliminada')
  }
  catch(e) {
    toast.error('Solo hay tres columnas, no se puede eliminar la columna')
  }
}
```

## Pruebas

Se prueba a la función `deleteThisColumnFromColumns` en el archivo `src\domainFunctions\deleteColumn.test.ts`.

Puedes ejecutar las pruebas de la función con el siguiente comando.

```bash
npm run test src/domainFunctions/deleteColumn.test.ts
```

:::info

Si el comando no funciona puedes probar dando vuelta los `/` o ejecutando todas las pruebas con el comando `npm run test`.