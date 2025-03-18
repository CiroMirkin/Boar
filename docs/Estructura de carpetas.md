
# Estructura de carpetas

```
└── 📁 Boar
    └── 📁 docs -------- Documentación
    └── 📁src
        └── App.tsx
        └── main.tsx
        └── Router.tsx
        └── store.ts
        └── vite-env.d.ts
        └── ErrorBoundary.tsx
        └── 📁ui ------------- Componentes genéricos y reutilizables.
        └── 📁i18next -------- Internacionalización de la aplicación.
        └── 📁lib
        └── 📁assets
        └── 📁components ----- Secciones simples de la aplicación que no contienen lógica de negocios.
            └── 404.tsx
            └── Configs.tsx
            └── Help.tsx
        └── 📁sharedByModules - Componentes, hooks y sub-módulos compartidos entre los módulos principales.
            └── 📁Theme
            └── 📁Header
        └── 📁modules --------- Módulos principales e independientes.
            └── 📁board
            └── 📁columnList
            └── 📁taskList
                └── 📁archive
                └── 📁Reminder
```

> Cada **Modulo** contiene dentro un componente principal, componentes secundarios, hooks, su propia gestión del estado, pruebas unitarias y sub-módulos.
