
# Estructura de carpetas

```
└── 📁 Boar
    └── 📁 docs - Documentación
    └── 📁 src
        └── App.tsx
        └── main.tsx
        └── 📁 assets 
        └── 📁 ui  - Componentes genéricos y reutilizables
        └── 📁 pages  - Paginas y contenido de la aplicación
            └── 📁 404  - Pagina 404
            └── 📁 archive  - Pagina y componentes únicos del archivo
            └── 📁 board  - Pagina y componentes únicos del tablero
            └── 📁 configs  - Pagina y componentes únicos de las preferencias
        └── 📁 contexts - Contextos y sus proveedores
        └── 📁 models - Modelos de dominio
        └── 📁 repositories - Implementaciones de los repositorios
        └── 📁 useCases - Lógica de los casos de uso
            └── useCase.ts
            └── 📁 column
            └── 📁 task
            └── 📁 archive
            └── 📁 board
        └── 📁 utils - Componentes y funciones utilitarias.
        └── 📁 configs - Archivos de configuración 
        └── 📁 redux 
        └── 📁 lib  
```

## Carpeta pages

Una página es una carpeta con un componente que esta asociado a una ruta, a su vez dentro de la carpeta de una pagina puede haber otros componentes específicos de esa pagina. 

Los componentes que no están dentro de ninguna carpeta son componentes compartidos entre paginas.
