# Boar
Autor: *Ciro Mirkin*

Aplicación web para gestionar tareas como *Trello* desarrollada con TypeScript y React.

Al entrar en la aplicación verá un tablero con tres columnas, cada columna indica el estado de las tareas que contiene.

Prototipo: [https://cm-boar.netlify.app/](https://cm-boar.netlify.app/)

:dart: **Stack:** <br> 
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat-square&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat-square&logo=react&logoColor=%2361DAFB) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat-square&logo=vite&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=flat-square&logo=css3&logoColor=white) ![GIT](https://img.shields.io/badge/Git-fc6d26?style=flat-square&logo=git&logoColor=white)

## Características principales

* Crear tareas.
* Mover las tareas entre columnas.
* Eliminar las tareas.
* Editar el nombre de las columnas.
* Crear nuevas columnas.
* Editar el contenido de las tareas. 
* Eliminar columnas.  
* Cambiar el nombre del tablero. 

## Referencias

Se utilizará [Trello](https://trello.com/es) como referencia.

![Captura de pantalla de Trello](https://images.ctfassets.net/rz1oowkt5gyp/4kCNudjaBYj90CGgG7Lict/cbafa67336b2007278f50d99ceabfb22/Boards_2x.png?w=1140&fm=webp)

### Anteriores intentos de realizar esta aplicación

[Repositorio del primer prototipo en Vanilla JavaScript.](https://github.com/CiroMirkin/miniVirtualKanbanTable)

[Repositorio del segundo prototipo en TypeScript.](https://github.com/CiroMirkin/Kan-Ban)

Si bien la segunda versión es estructuralmente superior al primer intento, no se considera una versión final, aunque si una aceptable.

## Desarrollo

Para el **FrontEnd** se eligió React en conjunto con TypeScript. CSS puro para dar estilos a los componentes y Vite como empaquetador.

Para el **testing** se eligió Vitest.

Para el **flujo de trabajo** se utilizara Git siguiendo la metodología *ship/show/ask* y GitHub para centralizar el código del proyecto.

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