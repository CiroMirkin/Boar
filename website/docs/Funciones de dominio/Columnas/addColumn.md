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

La función `getColumn` implementa este caso de uso en el archivo `src\domainFunctions\addColumn.ts`.

**Recibe** como parámetros el nombre de la nueva columna y la lista de columnas.
**Retorna** una lista de columnas con la nueva columna integrada al final.
**No lanza error** en ningún caso. 

```typescript
getColumn = ({ columnName, columns }: getColumn): columnModel
```

### Implementación

Con la nueva lista de columnas se pueden actualizar las columnas.

```tsx
const newColumns = addColumnAtTheEnd('Nueva columna', columns)
```

Esta función se implementa en el archivo `src\redux\columnsSlice.ts`.

## Pruebas

Se prueba a la función `addColumnAtTheEnd` en el archivo `src\domainFunctions\addColumn.test.ts`.

Puedes ejecutar las pruebas de la función con el siguiente comando.

```bash
npm run test src/domainFunctions/addColumn.test.ts
```

:::info

Si el comando no funciona puedes probar dando vuelta los `/` o ejecutando todas las pruebas con el comando `npm run test`.