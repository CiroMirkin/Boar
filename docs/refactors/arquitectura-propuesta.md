# Capo — Propuesta de reorganización a arquitectura screaming modular

Documento generado a partir del análisis del repo con codegraph. No se movió ningún archivo todavía; esto es la propuesta para revisar antes de tocar código.

> **Revisión 2026-09-02:** verificado contra el árbol de archivos real (rama `capo`). Cambios desde la revisión anterior:
> - **El proyecto se renombró de `Boar` a `Capo`** (`package.json`, app, rama). El documento se actualizó; el repo todavía se llama `Boar` en disco.
> - **`src/actions/` ya se refactorizó** (PR #179): pasó de 5 archivos planos a un directorio por dominio con barril (`board/`, `tasks/`, `tags/`, `notes/`, `archive/`), más `auth.ts` (`requireAuth`) y `shared.ts` (`requireBoardAccess` / `requireColumnAccess` / `requireTaskAccess`). Es una realización parcial de la sección 3 — ver notas ahí.
> - **Violaciones de dependencia resueltas:** `actions -> views` (0 ocurrencias, eran 5) y `ui -> views` (0, estaba dentro de las 10). **Nueva detectada:** `ui -> auth` (2, en `Header.tsx`). El resto sigue.
> - Conteos de archivos por carpeta actualizados (`common` 8→13, `actions` 5→33, `auth` 10→11, `i18next` 2→4, `lib` 2→4).
> - **codegraph reindexado el 2026-09-02** (v1.5.0): 334 archivos, 2167 nodos, 4641 edges, 1116 imports. El modelo del grafo cambió de versión (los imports ahora son nodos, no edges — por eso ya no aparece el "1284 edges imports" de versiones anteriores del documento). Las violaciones de abajo se verificaron por grep sobre el árbol; el grafo reindexado coincide.
>
> **Revisión 2026-09-01:** `src/pages/` fue renombrada a `src/views/` (imports de `app/*/page.tsx` a `@/views/...`); todas las referencias a `pages/` en este documento se actualizaron a `views/`. Se agregó `ui -> modules/LanguageToggle` a la tabla de violaciones.

---

## 1. Diagnóstico de la estructura actual

`src/` se divide hoy así:

| Carpeta | Archivos | Rol |
|---|---|---|
| `modules/` | 190 | Dominio de negocio (bien encaminado hacia screaming) |
| `ui/` | 35 | Design system (shadcn: atoms/molecules/organisms) |
| `auth/` | 11 | Autenticación |
| `views/` (ex `pages/`) | 10 | Composición de páginas (envueltas por `app/*/page.tsx`) |
| `common/` | 13 | Utilidades transversales (hooks + utils) |
| `actions/` | 33 | Server Actions (backend) — ya split por dominio + barril |
| `i18next/` | 4 | Configuración de idioma (cliente + server) |
| `lib/` | 4 | Prisma client + utils + rate-limit |

Y dentro de `modules/`:

| Módulo | Archivos |
|---|---|
| `TaskBoard` | 122 |
| `notes` | 19 |
| `UsageHistory` | 18 |
| `board` | 10 |
| `Dashboard` | 7 |
| `Theme` | 5 |
| `LanguageToggle` | 5 |
| `TypeOfView` | 4 |

**El diagnóstico central: `modules/` ya screams a nivel 1** (board, TaskBoard, notes, UsageHistory, Dashboard son nombres de dominio, no técnicos — eso está bien). El problema aparece a partir del nivel 2: `TaskBoard` concentra el 64% de todo el código de dominio y adentro vuelve a una organización técnica clásica (`components/`, `hooks/`, `model/`, `useCase/`, `repository/`, `state/`) anidada hasta 6-7 niveles de profundidad:

```
modules/TaskBoard/components/taskList/components/ArchivedTasks/repository/nextjsArchiveRepository.ts
modules/TaskBoard/components/taskList/components/Tags/repository/nextjsTagRepository.ts
modules/TaskBoard/components/Reminder/repository/nextjsReminderRepository.ts
```

`ArchivedTasks`, `Tags`, `Reminder` y `Columns` no son detalles de `taskList` — son subdominios propios, cada uno con su propio modelo, repositorio (local/Nextjs + factory) y casos de uso. Hoy están enterrados 4-5 carpetas adentro de `TaskBoard/components/taskList/components/`, cuando deberían ser hermanos al mismo nivel que `TaskBoard`.

### Violaciones de dependencia detectadas (vía grafo de imports)

Aparecen dependencias invertidas — capas que deberían ser "hoja" (sin conocer al dominio) importando desde el dominio. Estado al 2026-09-02 (grep sobre el árbol + grafo reindexado):

| Origen | Destino | Ocurrencias | Estado | Problema |
|---|---|---|---|---|
| `ui` | `modules/TaskBoard` model + Tags hook (`BlankTask.tsx`); `modules/notes` + `UsageHistory` + `TypeOfView` + `LanguageToggle` (`Header.tsx`) | 7 | pendiente | El design system (shadcn) no debería conocer features de negocio |
| `ui` | `auth` — `useSession`, `useBoardId` (`Header.tsx`) | 2 | pendiente (no estaba listada) | Mismo caso: `ui` es hoja, no conoce sesión |
| `common` | `auth` — `SessionType` en `useLoadingTimeout` (type-only); `modules/Theme` en `useTheme` | 3 | pendiente | Utilidades transversales dependiendo de features específicas |
| `auth` | `modules/board`, `modules/notes`, `modules/TaskBoard` (todo en `checkIfUserHasTheDefaultBoard.ts`) | 3 | pendiente | Auth debería ser consumido por los módulos, no al revés |
| `actions` | `views` | 0 | ✅ resuelto (PR #179 / fix boardId por ruta) | — |
| `ui` | `views` | 0 | ✅ resuelto | — |

No cuentan como violación bajo la arquitectura destino: `auth -> ui` (6 — `AuthCard`, `AuthForm`, `OAuthProviders`; una feature puede usar `shared/ui`) y `actions -> modules/*/model` (~18, casi todas `import type`; la regla de dependencia propuesta permite explícitamente que `actions/` importe `model/` de las features).

Ninguna de las pendientes es grave hoy (son pocas ocurrencias), pero son la semilla de ciclos de dependencia a medida que el repo crezca, y contradicen la regla básica de screaming/clean architecture: **las capas compartidas y el backend no conocen features concretas; las features conocen lo compartido.**

### Capa `views/` (ex `pages/`) duplicada

`src/views/*.tsx` (10 archivos — carpeta renombrada desde `src/pages/` después de la primera versión de este documento; los imports en `app/*/page.tsx` ya apuntan a `@/views/...`) sigue existiendo como capa intermedia envuelta por `app/*/page.tsx` — es un remanente de la migración de React Router a App Router (`migration.md`, Task 10). El renombre saca la ambigüedad con el Pages Router de Next.js, pero no resuelve la indirección: sigue sin cumplir ninguna función que el propio App Router no resuelva.

---

## 2. Propuesta: `features/` + `shared/` con slices consistentes

Idea: en vez de "screaming" solo a nivel 1 y técnico después, cada feature es una carpeta autocontenida con la misma forma interna en todos los niveles, y solo expone un `index.ts` como API pública (nadie importa un archivo interno de otra feature directamente).

```
src/
├── features/
│   ├── boards/              (ex modules/board — CRUD de tableros)
│   │   ├── ui/
│   │   ├── model/
│   │   ├── api/             (repository: local-storage.ts, nextjs.ts, factory.ts)
│   │   ├── hooks/
│   │   └── index.ts
│   ├── columns/             (ex TaskBoard/components/Columns)
│   ├── tasks/                (ex TaskBoard/components/taskList, sin ArchivedTasks/Tags)
│   ├── archived-tasks/       (ex TaskBoard/.../ArchivedTasks — sube a top-level)
│   ├── tags/                 (ex TaskBoard/.../Tags — sube a top-level)
│   ├── reminders/            (ex TaskBoard/components/Reminder — sube a top-level)
│   ├── notes/                (incluye LibraryOfArchiveNotes como sub-slice)
│   ├── usage-history/
│   ├── dashboard/            (listado de boards del usuario)
│   └── auth/                 (ex src/auth)
├── shared/
│   ├── ui/                   (ex src/ui — design system, CERO imports desde features/)
│   ├── i18n/                 (ex i18next)
│   ├── lib/                  (prisma client, utils)
│   ├── errors/
│   ├── hooks/                (ex common/hooks)
│   └── preferences/          (ex modules/Theme, modules/LanguageToggle, modules/TypeOfView —
│       ├── theme/             transversales, no son dominio Kanban en sí)
│       ├── language/
│       └── view-mode/
└── (se elimina src/views/, ex src/pages/ — ver punto 3)

app/                          (Next.js App Router — solo compone features/, sin lógica propia)
├── board/[id]/page.tsx
├── archive/[id]/page.tsx
├── settings/[id]/page.tsx
...

prisma/                       (sin cambios)
```

Regla de dependencia a aplicar (y que se puede chequear con el propio codegraph después de cada paso):

```
shared/ui, shared/lib, shared/i18n   →  no importan nada de features/ ni de app/
features/*                            →  pueden importar shared/*, y solo el index.ts
                                          público de otras features (no archivos internos)
app/*                                 →  solo importa features/*.index.ts, nunca al revés
actions/ (si se mantiene centralizado) → solo importa model/ y api/ de features, nunca ui/
```

### Estructura interna sugerida por feature (ejemplo con `tags/`)

```
features/tags/
├── ui/
│   ├── EnableTags.tsx
│   └── TagGroupSelect.tsx
├── model/
│   ├── tags.ts                  (tipos: Tag, TagGroup)
│   ├── defaultTags.ts
│   └── getHighestPriority.ts
├── api/
│   ├── tagRepository.ts         (interfaz — puerto)
│   ├── localStorageTagRepository.ts
│   ├── nextjsTagRepository.ts
│   ├── actions.ts               (Server Actions de esta feature: getActiveTagGroup, setActiveTagGroup...)
│   └── index.ts                 (factory: elige local vs nextjs según sesión)
├── hooks/
│   ├── useActualTagGroup.tsx
│   ├── useAvailableTags.tsx
│   ├── useTagsQuery.tsx
│   └── useUserSelectedTags.tsx
├── state/
│   └── store.ts
└── index.ts                     (re-exporta lo que otras features pueden usar)
```

El patrón repositorio (`LocalStorage*Repository` + `Nextjs*Repository` + factory) que ya tienen para cada módulo es exactamente el mecanismo de puertos/adaptadores que screaming architecture pide — no hay que inventarlo, hay que **mantenerlo consistente y ponerlo en el mismo lugar (`api/`) en todas las features**, en vez de que a veces esté en `repository/` a nivel de módulo y otras veces cuatro carpetas más abajo.

---

## 3. Qué hacer con `src/views/` y `src/actions/`

**`src/views/`** (ex `src/pages/`): dado que Task 10 de la migración ya está completa y todas las rutas viven en `app/`, esta capa intermedia puede desaparecer. La lógica de composición de cada página (`BoardPage.tsx`, `UserDashboard.tsx`, etc.) se mueve directamente a `app/*/page.tsx`, o si preferís mantener los componentes de página separados de los archivos de ruta por testeabilidad, a `features/<feature>/ui/<Feature>Page.tsx` cuando la página pertenece claramente a una sola feature (ej. `TimeTracking.tsx` → `features/usage-history/ui/UsageHistoryPage.tsx`).

**`src/actions/`** (ya avanzado en PR #179): pasó de 5 archivos planos a un directorio por dominio, cada uno con un barril `index.ts`:

```
src/actions/
├── board/    (getBoards, createBoard, deleteBoard, getBoardById, updateBoardName,
│              getReminders, saveReminders, getUsageHistory, saveUsageHistory)
├── tasks/    (getTaskBoard, saveTaskBoard, createTask, updateTask, deleteTask,
│              moveTask, createColumn, deleteColumn, updateColumnName)
├── tags/     (getActiveTagGroup, setActiveTagGroup)
├── notes/    (getNotes, saveNotes)
├── archive/  (getArchive, saveArchive, getArchivedNotes, saveArchivedNotes)
├── auth.ts   (requireAuth)
└── shared.ts (requireBoardAccess, requireColumnAccess, requireTaskAccess — auth + ownership por fila)
```

Los helpers compartidos ya están centralizados (`auth.ts` + `shared.ts`), que era el punto clave. Falta la última mitad de la propuesta: cuando se haga la migración a `features/`, cada `src/actions/<dominio>/` se mueve a `features/<feature>/api/` y `src/actions/shared.ts` a `shared/lib/`. El split por dominio actual hace ese movimiento casi un `git mv` por carpeta.

---

## 4. Plan de migración incremental (sin romper nada en el camino)

Igual que en `migration.md`, conviene ir feature por feature dejando la app siempre demoable, en vez de un big-bang. Orden sugerido (de menor a mayor riesgo/tamaño):

1. **`shared/`**: mover `ui/`, `common/`, `lib/`, `i18next/` sin cambiar su contenido, solo actualizar imports. Es mecánico y no toca lógica.
2. **Features chicas y ya aisladas**: `Theme`, `LanguageToggle`, `TypeOfView`, `Dashboard`, `UsageHistory`, `notes`, `board` → renombrar `modules/X` a `features/x` (kebab-case) y reordenar internamente a `ui/model/api/hooks`.
3. **Romper `TaskBoard`**: extraer `Columns`, `Reminder`, `Tags`, `ArchivedTasks` como features top-level (y dejar el núcleo de `taskList` como la feature `tasks`). Es el paso de mayor superficie: de los 8 módulos actuales, este único módulo (`TaskBoard`, el 64% del código de dominio) se parte en 5 features nuevas, pero cada una ya tiene sus límites claros (modelo + repo + useCase propios), así que es más mecánico de lo que parece.
4. **`auth`** → `features/auth`, resolviendo `auth -> modules/*` (3) y de paso `ui -> auth` (2, mover `useSession`/`useBoardId` fuera de `Header` o inyectarlos por props) y `common -> auth` (1).
5. **Eliminar `src/views/`** (ex `src/pages/`), mover composición a `app/` o a la feature dueña.
6. ~~**Decidir `actions/`**~~ — hecho (PR #179): split por dominio + helpers centralizados. Resta mover cada `src/actions/<dominio>/` a `features/<feature>/api/` junto con su feature en los pasos 2-3, y `shared.ts` a `shared/lib/` en el paso 1.
7. **Reindexar codegraph** (`codegraph index`) después de cada paso y verificar que las dependencias invertidas de la sección 1 desaparecieron. El índice se desactualiza con cualquier `git mv`, así que conviene reindexar antes de leerlo.

Cada paso se puede validar con `npm run build`, `npm run test` y `npm run test:e2e` antes de pasar al siguiente, igual que hicieron en la migración a Next.js.

---

## 5. Decisiones ya tomadas

- `Theme` / `LanguageToggle` / `TypeOfView` → `shared/preferences/` (transversal, no son dominio Kanban).
- `actions/` → distribuido por dominio. **Primer paso ya aplicado** (PR #179): `src/actions/<dominio>/` con barril + `auth.ts` / `shared.ts` centralizados. El destino final sigue siendo `features/<feature>/api/`.

Con esto el plan del punto 4 queda cerrado. Falta decidir cómo arrancar: migración feature por feature (empezando por `shared/`), o generar antes el árbol de carpetas completo como checklist para ir tildando.
