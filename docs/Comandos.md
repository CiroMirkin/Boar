
# Comandos

## Servidor de desarrollo

Para correr el servidor de desarrollo:

```bash
npm run dev
```

El comando `npm run start` construirá el sitio en un **servidor de desarrollo local** listo para usarse en [http://localhost:5173/](http://localhost:5173/).

## Despliegue

Para compilar la aplicación:

```
npm run build
```

El comando `npm run build` creara la carpeta `dist` en la raíz del directorio.

## Linting

Para correr el linter:

```bash
npm run lint
```

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

> [!WARNING]
> **No olvide** agregar la extension `.test` al escribir el nombre del archivo.

Para correr todas las pruebas con entorno gráfico: 

```bash
npm run test-ui
```

El comando `npm run test-ui` creara un **sitio local** donde poder ver el estado de las pruebas en: [http://localhost:51204/__vitest__/#/](http://localhost:51204/__vitest__/#/).
