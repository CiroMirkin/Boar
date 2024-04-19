---
tags:
  - Comandos
  - Pruebas
---
# Pruebas

Para correr todas las pruebas por consola: 

```bash
npm test
```

Para correr solo las pruebas de un archivo:

```bash
npm test addTask.test.ts
```
o
```bash
npm test src/useCase/addTask.test.ts
```

:::warning
**No olvide** agregar la extension `.test` al escribir el nombre del archivo.
:::

Para correr todas las pruebas con entorno gráfico: 

```bash
npm run test-ui
```

El comando `npm run test-ui` creara un **sitio local** donde poder ver el estado de las pruebas en: [http://localhost:51204/__vitest__/#/](http://localhost:51204/__vitest__/#/).
