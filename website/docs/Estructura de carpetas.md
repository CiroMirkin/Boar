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
        └── 📁 components  - Componentes que comparten las paginas
        └── 📁 pages  - Paginas de la aplicación, una página es un componente, Cada página está asociada a una ruta.
        └── 📁 lib 
        └── 📁 models - Modelos de dominio
        └── 📁 useCase - Lógica de los casos de uso
            └── useCase.ts
            └── 📁 column
            └── 📁 task
        └── 📁 utility - Funciones utilitarias, por ejemplo, una función para obtener la fecha.
        └── 📁 redux  
```