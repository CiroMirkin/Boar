# Boar
Autor: *Ciro Mirkin*

Aplicación web para gestionar tareas desarrollada con TypeScript y React.

El usuario al entrar en la aplicación verá un tablero con tres columnas que contienen tareas, donde las columnas indican el estado de las tareas.

:dart: **Stack:** <br> 
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat-square&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat-square&logo=react&logoColor=%2361DAFB) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat-square&logo=vite&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=flat-square&logo=css3&logoColor=white) ![GIT](https://img.shields.io/badge/Git-fc6d26?style=flat-square&logo=git&logoColor=white)

## Características

Ordenadas de mayor a menor prioridad, comenzando por las *fundamentales*.

### Características fundamentales

* Crear tareas. :white_check_mark:
* Mover las tareas entre columnas. :white_check_mark:
* Eliminar las tareas. :white_check_mark:
* Editar el nombre de las columnas. :white_check_mark:

### Características secundarias

* Crear nuevas columnas. :white_check_mark:
* Editar el contenido de las tareas.  :white_check_mark:
* Eliminar columnas, siempre debe haber mínimo tres columnas, nunca menos.  :white_check_mark:
* Cambiar el nombre del tablero. :white_check_mark:

### Características agregadas

* Poder descargar y subir un archivo con la información del tablero.
* Marcar una tarea como terminada.
* Ver todas las tareas terminadas, ordenadas de la más reciente a la más antigua.

* Métricas:
    * Cuantas tareas hay en total.
    * Cuantas tareas hay en cada columna.
    * Cuantas tareas se terminaron.
    * Cuantas tareas no se terminaron.

### Características a evaluar

* Cambiar el color de las columnas. *(En evaluación)*
* Cambiar el color de las tareas. *(En evaluación)*
* Vaciar una columna, eliminar todas las tareas que contiene. *(En evaluación)*
* Mover una columna de lugar. *(En evaluación)*
* Ver cuanto tiempo promedio tarda una tarea en terminarse contando desde el momento en que se crea. *(En evaluación)*

## Referencias

Se utilizará [Trello](https://trello.com/es) como referencia.

![Captura de pantalla de Trello](https://images.ctfassets.net/rz1oowkt5gyp/4kCNudjaBYj90CGgG7Lict/cbafa67336b2007278f50d99ceabfb22/Boards_2x.png?w=1140&fm=webp)

### Anteriores intentos de realizar esta aplicación

[Repositorio del primer intento con Vanilla JavaScript.](https://github.com/CiroMirkin/miniVirtualKanbanTable)

[Repositorio del segundo intento con TypeScript.](https://github.com/CiroMirkin/Kan-Ban)

Si bien la segunda versión es estructuralmente superior al primer intento, no se considera una versión final, aunque si una aceptable.

## Desarrollo

Para el **FrontEnd** se eligió React en conjunto con TypeScript. CSS puro para dar estilos a los componentes y Vite como empaquetador.

Para el **testing** se eligió Vitest y Jest.

Para el **flujo de trabajo** se utilizara Git siguiendo la metodología *ship/show/ask*, Trello para la gestión de tareas y GitHub para centralizar el código del proyecto.

## Documentación

1. Puede leer la documentación en linea en [cm-boar-docs.netlify.app](https://cm-boar-docs.netlify.app/) o 
2. puede acceder a la documentación localmente primero ejecutando:

    ```bash
    cd website
    ```
    Y luego:
    ```bash
    npm run start
    ```
    Con `cd website` entrara al directorio donde esta la documentación y con `npm run start` se creara el sitio con la documentación en [http://localhost:3000/](http://localhost:3000/).