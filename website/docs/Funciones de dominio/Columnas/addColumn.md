---
description: Crear una columna
tags:
  - Columnas
  - Dominio
---

# Crear una columna

**Reglas de negocio**:
* Por defecto el nombre de las nuevas columnas es *Nueva columna*.
* Las nuevas columnas se agregan al final.

## Función de dominio

La función `addColumnAtTheEnd` implementa este caso de uso en el archivo `src\domainFunctions\addColumn.ts`.

**Recibe** como parámetros:
```typescript
columnName: string, 
columns: columnModel[]
```

**Retorna** una lista de columnas con la nueva columna integrada al final.

```typescript
columnModel[]
```

**No lanza error** en ningún caso. 

### Implementación

Con la nueva lista de columnas se pueden actualizar las columnas.

```tsx
const newColumns = addColumnAtTheEnd('Nueva columna', columns)
setColumns(newColumns)
```

Se implementa en el componente `Boar`.

```tsx title="/src/components/Boar.tsx"
const addNewColumnAtTheEndOfTheBoard = () => {
    // highlight-next-line
    const newColumns = addColumnAtTheEnd('Nueva columna', columns)
    // highlight-next-line
    setColumns(newColumns)
    toast.success('Columna creada')
  }
```

## Pruebas

Se prueba a la función `addColumnAtTheEnd` en el archivo `src\domainFunctions\addColumn.test.ts`.

Puedes ejecutar las pruebas de la función con el siguiente comando.

```bash
npm run test src/domainFunctions/addColumn.test.ts
```

:::info

Si el comando no funciona puedes probar dando vuelta los `/` o ejecutando todas las pruebas con el comando `npm run test`.