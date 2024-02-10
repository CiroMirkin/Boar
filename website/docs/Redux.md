---
description: Implementación de Redux.
tags:
  - Redux
  - Estado Global
  - Librería
---

Para gestionar el estado global de la aplicación se utiliza [Redux Toolkit](https://redux-toolkit.js.org/) dentro de la carpeta `src/redux`.


Se eligió Redux porque es la opción mas vieja y conocida, aunque hoy dia Zustand esta ganando mucha popularidad.

1. Los *reducers* de redux utilizan las funciones de dominio (domainFuntions).

2. Los *reducers* no se utilizan directamente en la aplicación, se utilizan a través de las opciones de dominio (domainOptions).

    No se utilizan directamente para no acoplar Redux a la aplicación y que en un futuro si es necesario se facilite la migración a otro gestor.

    Aun falta mejorar la separación de Redux, pero actualmente la aplicación no es muy grande y las opciones de tareas y columnas están desperdigadas por toda la aplicación.

![Relación entre Redux y las opciones de domino](/img/Redux_and_Domain_Options.svg)