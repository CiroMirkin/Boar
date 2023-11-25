# Boar
Autor: *Ciro Mirkin*

Aplicación web para gestionar tareas desarrollada con TypeScript y React.

El usuario al entrar en la aplicación verá un tablero con tres columnas que contienen tareas, donde las columnas indican el estado de las tareas.

## Características

Ordenadas de mayor a menor prioridad, comenzando por las *fundamentales*.

### Características fundamentales

* Crear tareas.
* Mover las tareas entre columnas.
* Editar el contenido de las tareas.
* Eliminar las tareas.
* Saber cuantas tareas hay en total.

### Características de columnas

* Crear nuevas columnas.
* Editar el nombre de las columnas.
* Eliminar columnas, siempre debe haber mínimo tres columnas nunca menos.

### Características agregadas

* Cambiar el nombre del tablero.
* Poder descargar y subir un archivo con la información del tablero.

Como métricas el usuario puede saber:

* Cuantas tareas hay en total.
* Cuantas tareas hay en cada columna.
* Cuantas tareas se completaron.
* Cuantas tareas no se completaron.

### Características a evaluar

* Marcar una tarea como terminada. *(En evaluación)*
* Vaciar un columna, eliminar todas las tareas que contiene. *(En evaluación)*
* Mover una columna de lugar. *(En evaluación)*
* Cuanto tiempo promedio tarda una tarea en terminarse contando desde el momento en que se crea. *(En evaluación)*

## Referencias

Se utilizará [Trello](https://trello.com/es) como referencia para funcionalidades.

![Aparente captura de pantalla de Trello](https://lh3.googleusercontent.com/u/0/drive-viewer/AK7aPaCeOAXU-0eStwRIA1J8rc0EYGAh6SO3vUQ4RmIi22Mo--p96TVOvWFubjeQXexVslcxE2MFcCjfXrKOdBLMG4OPa9X0=w1024-h484)

### Wireframe

![Wireframe de la aplicación]()

### Anteriores intentos de realizar esta aplicación

[Repositorio del primer intento con Vanilla JavaScript.](https://github.com/CiroMirkin/miniVirtualKanbanTable)

[Repositorio del segundo intento con TypeScript.](https://github.com/CiroMirkin/Kan-Ban)

Si bien la segunda versión es estructuralmente superior al primer intento, no se considera una versión final, aunque si una aceptable.

## Desarrollo

Para el **FrontEnd** se eligió React en conjunto con TypeScript, esto por. CSS puro para dar estilos a los componentes y Vite como empaquetador.

Para el **testing** se eligió Vitest y Jest.

Para el **flujo de trabajo** se utilizara Git siguiendo la metodología *Git Flow*, Trello para la gestión de tareas y GitHub para centralizar el código del proyecto.

### Comandos

El proyecto usa [Vite](https://vitejs.dev/) como empaquetador y [Vitest](https://vitest.dev/guide/) para el testing.

#### Desarrollo:

```
npm run dev
```

#### Testing: 

Testing por consola:

```
npm test
```

Testing por UI:

```
npm run test-ui
```

[http://localhost:51204/__vitest__/#/](http://localhost:51204/__vitest__/#/)

#### Despliegue:

```
npm run build
```