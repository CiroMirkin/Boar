---
sidebar_position: 1
description: Comandos básicos para utilizar Boar localmente.
tags:
  - Desarrollo
  - Comandos
  - Testing
  - Pruebas
---

# Introducción a Boar

Boar es una aplicación web para gestionar tareas. El usuario al entrar verá un tablero con tres columnas, donde cada columna indicara el estado de sus tareas.

Boar esta en linea, puedes usarlo en **[cm-boar.netlify.app](https://cm-boar.netlify.app/)**.

:dart: **Tecnologías utilizadas:**

* TypeScript
* React
* Vite
* Vitest
* Jest
* Git

## Comandos

Boar utiliza [Vite](https://vitejs.dev/) para el entorno frontend y [Vitest](https://vitest.dev/guide/) para el entorno de pruebas.

### Servidor de desarrollo

Para correr el servidor de desarrollo:

```bash
npm run dev
```

El comando `npm run start` construirá el sitio y un servidor de desarrollo, todo localmente y listo para usarse en [http://localhost:5173/](http://localhost:5173/).

### Pruebas

Para correr todas las pruebas por consola: 

```bash
npm test
```

Para correr todas las pruebas interfaz de usuario: 

```bash
npm run test-ui
```

El comando `npm run test-ui` creara un sitio local donde poder ver el estado de las pruebas en: [http://localhost:51204/__vitest__/#/](http://localhost:51204/__vitest__/#/).

### Despliegue

Para compila la aplicación

```
npm run build
```

El comando `npm run build` creara la carpeta `dist` en la raíz del directorio.