---
sidebar_position: 6
description: Estructura de carpetas
tags: 
  - Carpetas  
  - Pruebas
  - Documentación
  - Casos de uso
---
# Estructura de carpetas

```
└── 📁 Boar
    └── 📁 website - Documentación
        └── 📁 docs - Paginas de la documentación
    └── 📁 src
        └── App.tsx
        └── main.tsx
        └── tutorialSteps.ts
        └── 📁 assets 
        └── 📁 ui  - Componentes genéricos y reutilizables
        └── 📁 pages  - Paginas y contenido de la aplicación.
        └── 📁 lib 
        └── 📁 models - Modelos de dominio
        └── 📁 useCase - Lógica de los casos de uso
            └── useCase.ts
            └── 📁 column
            └── 📁 task
        └── 📁 utility - Funciones utilitarias, por ejemplo, una función para obtener la fecha.
        └── 📁 redux  
```

## Carpeta pages

Una página es una carpeta con un componente que esta asociado a una ruta, a su vez dentro de la carpeta de una pagina puede haber otros componentes específicos de esa pagina. 

Los componentes que no están dentro de ninguna carpeta son componentes compartidos entre paginas.
