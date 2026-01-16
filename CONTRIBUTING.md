# Convenciones de Commits

Este proyecto utiliza conventional commits con tipos en **español** para el versionado automático. Los tipos determinan si se genera un release mayor, menor o de parche.

## Tipos de Commit

-   `agrega:` - Nueva funcionalidad (release menor)
-   `implementa:` - Implementación de nueva funcionalidad (release menor)
-   `refactor:` - Refactorización de código (release menor)
-   `elimina:` - Eliminación de funcionalidad (release menor)
-   `fix:` - Corrección de bug (release de parche)
-   `actualiza:` - Actualización de contenido o documentación (no genera release)
-   `cambia:` - Cambios de estilo o ajustes menores (no genera release)
-   `documenta:` - Cambios en documentación (no genera release)

## Ejemplos

```
agrega: nueva funcionalidad de autenticación
fix: corrige error en validación de formulario
refactor: simplifica lógica de renderizado en Dashboard
elimina: remueve soporte para IE11
documenta: actualiza README con nuevas instrucciones
```

## Notas

-   Para releases mayores, incluye `BREAKING CHANGE:` en el mensaje.
-   Los merges de pull requests deben seguir estas convenciones si usan squash.
-   El versionado automático se ejecuta en pushes a la rama `main`.
