---
description: Resaltar una tarea
tags:
  - Tareas
  - Dominio
---

# Resaltar una tarea

La función establece una tarea como resaltada y si ya lo esta la establece como no resaltada.

La función `setThisTaskAsHighlightedTask` implementa este caso de uso en el archivo `src\domainFunctions\highlightedTask.ts`.

**Recibe** como parámetro la tarea a resaltar:

```typescript
task: taskModel
```

**Retorna** la tarea ya resaltada.

```typescript
taskModel
```

### Implementación

Esta función se implementa en el archivo `src\redux\columnsSlice.ts`.

## Pruebas

Se prueba a la función `setThisTaskAsHighlightedTask` en el archivo `src\domainFunctions\highlightedTask.test.ts`.

Puedes ejecutar las pruebas de la función con el siguiente comando.

```bash
npm run test src/domainFunctions/highlightedTask.test.ts
```

:::info

Si el comando no funciona puedes probar dando vuelta los `/` o ejecutando todas las pruebas con el comando `npm run test`.