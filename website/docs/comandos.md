---
sidebar_position: 2
description: Comandos básicos para utilizar Boar localmente.
tags:
  - Desarrollo
  - Comandos
  - Testing
  - Pruebas
  - Documentación
---

# Comandos

Boar utiliza [Vite](https://vitejs.dev/) para el entorno frontend y [Vitest](https://vitest.dev/guide/) para el entorno de pruebas.

## Servidor de desarrollo

Para correr el servidor de desarrollo:

```bash
npm run dev
```

El comando `npm run start` construirá el sitio en un **servidor de desarrollo local** listo para usarse en [http://localhost:5173/](http://localhost:5173/).

## Pruebas

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
**No olvide** agregar la extension `.test` escribir el nombre del archivo.
:::

Para correr todas las pruebas con entorno gráfico: 

```bash
npm run test-ui
```

El comando `npm run test-ui` creara un **sitio local** donde poder ver el estado de las pruebas en: [http://localhost:51204/__vitest__/#/](http://localhost:51204/__vitest__/#/).

## Documentación

Puede acceder a la documentación localmente primero ejecutando:

```bash
cd website
```
    
Luego para instalar las dependencias:

```bash
npm i
```

Y por último:
    
```bash
npm run start
```

Con `cd website` entrara al directorio donde esta la documentación y con `npm run start` se creara el sitio con la documentación en [http://localhost:3000/](http://localhost:3000/).

:::info
También puede acceder a la documentación en linea: [cm-boar-docs.netlify.app](https://cm-boar-docs.netlify.app/).
:::
## Despliegue

Para compila la aplicación:

```
npm run build
```

El comando `npm run build` creara la carpeta `dist` en la raíz del directorio.