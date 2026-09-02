# Capo — Propuesta de reorganización a arquitectura screaming modular

Documento generado a partir del análisis del repo con codegraph. Los pasos 1 (`shared/`) y 2 (features chicas + `shared/preferences/`) ya están hechos; el resto (paso 3 en adelante) es propuesta para revisar antes de tocar código.

> **Revisión 2026-09-02 (paso 2 COMPLETO):** verificado contra el árbol real, `tsc --noEmit` limpio, 75/75 tests unitarios en verde, `next build` exit 0. Rama `refactor/arquitectura` (7 commits: `5038972a` `7f88dcb5` `45f391f9` `8417e7ab` `7b095814` `1a710a60` `610a144f`).
> - **El paso 2 del plan (sección 4) está terminado.** `src/modules/` quedó **solo con `TaskBoard`** (se parte en el paso 3).
> - **Features nuevas** en `src/features/` (layout `ui/ model/ api/{actions,repository}/ hooks/` + `index.ts` como única API pública): `notes` (24), `tags` (19), `dashboard` (11), `usage-history` (21), `boards` (13, ex `board`).
> - **`tags` reorganizada** al mismo layout que `notes` (antes era un `git mv` mecánico con estructura interna vieja). `api/` se subdivide en `actions/` (Server Actions) y `repository/` (puertos + adaptadores + factory).
> - **`shared/preferences/`** creado: `theme/` (6, ex `modules/Theme`), `language/` (6, ex `modules/LanguageToggle`), `view-mode/` (5, ex `modules/TypeOfView`). Cada uno con `ui/ model/ hooks/` (+ `state/` en theme) + barril.
> - **Server Actions co-locadas**: cada `src/actions/<dominio>/` se movió a `features/<feature>/api/actions/` junto con su feature. `src/actions/` bajó de 31 a 16 archivos y quedó solo con lo que pertenece a `TaskBoard` (paso 3): `tasks/` (10), `archive/` (3), `reminders/` (3, ex `board/` — solo quedaban ahí las actions de Reminder, se renombró la carpeta).
> - **Violación resuelta**: `shared/hooks/useTheme.tsx → modules/Theme` ahora es `→ shared/preferences/theme` (shared→shared, ya no cruza a un módulo de dominio). Ver tabla en sección 1.
> - codegraph **pendiente de reindexar** (`codegraph index`).
>
> **Revisión 2026-09-02 (paso 1 `shared/` COMPLETO):** verificado contra el árbol real + codegraph resincronizado, `tsc --noEmit` limpio, 75/75 tests unitarios en verde.
> - **El paso 1 del plan (sección 4) está terminado** (commits `187728c0`, `bb236571`, `0bf3168b`, `216ea90d` + este cambio): `src/ui/`, `src/common/`, `src/lib/`, `src/i18next/` **ya no existen como carpetas top-level** — se consolidaron en `src/shared/{ui,hooks,lib,errors,i18n}`. El layout resultante coincide con el propuesto en la sección 2 (`shared/hooks` ← `common/hooks`; `common/utils` → `shared/lib`; `common/errors` → `shared/errors`).
> - **`src/actions/auth.ts` + `src/actions/shared.ts` → `src/shared/lib/serverAuth.ts`** (un solo archivo con los 4 guards de servidor: `requireAuth`, `requireBoardAccess`, `requireColumnAccess`, `requireTaskAccess`). 26 imports reescritos a `@/shared/lib/serverAuth`. `src/actions/` bajó de 33 a 31 archivos.
> - El movimiento de `shared/` fue mecánico (solo `git mv` + imports), así que **las violaciones de dependencia viajaron con los archivos sin resolverse**: siguen las mismas, con los paths reescritos (`ui/` → `shared/ui/`, `common/` → `shared/hooks/`). Se resuelven en los pasos 2-4. Ver tabla en sección 1.
> - `src/shared/` = 57 archivos. Falta (fuera del alcance del paso 1): `shared/preferences/` (Theme / LanguageToggle / TypeOfView siguen en `src/modules/`).
> - **codegraph resincronizado el 2026-09-02** (v1.5.0): 333 archivos, 2165 nodos, 4611 edges, 1115 imports.
>
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

`src/` se divide hoy así (tras pasos 1 y 2):

| Carpeta | Archivos | Rol |
|---|---|---|
| `modules/` | 106 | Solo `TaskBoard` — se parte en el paso 3 |
| `features/` | 88 | Features autocontenidas (paso 2) — `notes` 24, `usage-history` 21, `tags` 19, `boards` 13, `dashboard` 11 |
| `shared/` | 74 | Capa compartida — `ui/` 35, `preferences/` 17 (`theme` 6, `language` 6, `view-mode` 5), `lib/` 9, `hooks/` 8, `i18n/` 4, `errors/` 1 |
| `actions/` | 16 | Server Actions que aún pertenecen a `TaskBoard` (paso 3) — `tasks/` 10, `archive/` 3, `reminders/` 3 |
| `auth/` | 11 | Autenticación |
| `views/` (ex `pages/`) | 10 | Composición de páginas (envueltas por `app/*/page.tsx`) — se elimina en el paso 5 |

Y dentro de `modules/` queda un único módulo:

| Módulo | Archivos |
|---|---|
| `TaskBoard` | 106 |

**El diagnóstico central: `modules/` ya screams a nivel 1** (tras el paso 2, `board`/`notes`/`usage-history`/`dashboard` son features en `features/`, con nombres de dominio). El problema restante es `TaskBoard`: concentra ~el 64% del código de dominio y adentro vuelve a una organización técnica clásica (`components/`, `hooks/`, `model/`, `useCase/`, `repository/`, `state/`) anidada hasta 6-7 niveles de profundidad:

```
modules/TaskBoard/components/taskList/components/ArchivedTasks/repository/nextjsArchiveRepository.ts
modules/TaskBoard/components/taskList/components/Tags/repository/nextjsTagRepository.ts
modules/TaskBoard/components/Reminder/repository/nextjsReminderRepository.ts
```

`ArchivedTasks`, `Tags`, `Reminder` y `Columns` no son detalles de `taskList` — son subdominios propios, cada uno con su propio modelo, repositorio (local/Nextjs + factory) y casos de uso. Hoy están enterrados 4-5 carpetas adentro de `TaskBoard/components/taskList/components/`, cuando deberían ser hermanos al mismo nivel que `TaskBoard`.

### Violaciones de dependencia detectadas (vía grafo de imports)

Aparecen dependencias invertidas — capas que deberían ser "hoja" (sin conocer al dominio) importando desde el dominio. Estado al 2026-09-02 tras el paso 2 (grep sobre el árbol). El paso 2 resolvió una (`shared/hooks -> modules/Theme`); las de `shared/ui` y `auth` bajaron de ocurrencias pero siguen (ahora apuntan a `features/` en vez de `modules/`, mismo problema conceptual).

| Origen | Destino | Ocurrencias | Estado | Problema |
|---|---|---|---|---|
| `shared/ui` | `modules/TaskBoard/model/task` + `features/tags` (`organisms/BlankTask.tsx`, 2); `features/notes` + `features/usage-history` (`organisms/Header.tsx`, 2) | 4 | pendiente | El design system (shadcn) no debería conocer features de negocio |
| `shared/ui` | `auth` — `useSession`, `useBoardId` (`organisms/Header.tsx`) | 2 | pendiente | Mismo caso: `ui` es hoja, no conoce sesión |
| `shared/hooks` | `auth` — `SessionType` en `useLoadingTimeout.tsx` (type-only) | 1 | pendiente | Utilidad transversal dependiendo de una feature |
| `shared/hooks` | `modules/Theme` (`useTheme.tsx`) | 0 | ✅ resuelto (paso 2: `→ shared/preferences/theme`) | — |
| `auth` | `features/boards`, `features/notes`, `modules/TaskBoard/model/taskBoard` (todo en `utils/checkIfUserHasTheDefaultBoard.ts`) | 3 | pendiente | Auth debería ser consumido por las features, no al revés |
| `actions` | `views` | 0 | ✅ resuelto (PR #179 / fix boardId por ruta) | — |
| `ui` | `views` | 0 | ✅ resuelto | — |

No cuentan como violación bajo la arquitectura destino: `auth -> shared/ui` (6 — `AuthCard`, `AuthForm`, `OAuthProviders`; una feature puede usar `shared/ui`) y `actions -> modules/*/model` (~18, casi todas `import type`; la regla de dependencia propuesta permite explícitamente que `actions/` importe `model/` de las features).

Ninguna de las pendientes es grave hoy (son pocas ocurrencias), pero son la semilla de ciclos de dependencia a medida que el repo crezca, y contradicen la regla básica de screaming/clean architecture: **las capas compartidas y el backend no conocen features concretas; las features conocen lo compartido.**

### Capa `views/` (ex `pages/`) duplicada

`src/views/*.tsx` (10 archivos — carpeta renombrada desde `src/pages/` después de la primera versión de este documento; los imports en `app/*/page.tsx` ya apuntan a `@/views/...`) sigue existiendo como capa intermedia envuelta por `app/*/page.tsx` — es un remanente de la migración de React Router a App Router (`migration.md`, Task 10). El renombre saca la ambigüedad con el Pages Router de Next.js, pero no resuelve la indirección: sigue sin cumplir ninguna función que el propio App Router no resuelva.

---

## 2. Propuesta: `features/` + `shared/` con slices consistentes

Idea: en vez de "screaming" solo a nivel 1 y técnico después, cada feature es una carpeta autocontenida con la misma forma interna en todos los niveles, y solo expone un `index.ts` como API pública (nadie importa un archivo interno de otra feature directamente).

```
src/
├── features/
│   ├── boards/              ✅ (ex modules/board — CRUD de tableros)
│   │   ├── ui/
│   │   ├── model/
│   │   ├── api/{actions,repository}/
│   │   ├── hooks/
│   │   ├── useCase/
│   │   └── index.ts
│   ├── columns/             ⬜ (ex TaskBoard/components/Columns — paso 3)
│   ├── tasks/                ⬜ (ex TaskBoard/components/taskList, sin ArchivedTasks/Tags — paso 3)
│   ├── archived-tasks/       ⬜ (ex TaskBoard/.../ArchivedTasks — paso 3)
│   ├── tags/                 ✅ (ex TaskBoard/.../Tags — subió a top-level en el paso 2)
│   ├── reminders/            ⬜ (ex TaskBoard/components/Reminder — paso 3; sus actions ya están en src/actions/reminders/)
│   ├── notes/                ✅ (incluye LibraryOfArchiveNotes aplanado como ui/model/api)
│   ├── usage-history/        ✅
│   ├── dashboard/            ✅ (listado de boards del usuario)
│   └── auth/                 ⬜ (ex src/auth — paso 4)
├── shared/                   ✅ (pasos 1 y 2) — falta solo cortar los imports invertidos de shared/ui
│   ├── ui/                   ✅ (ex src/ui — design system; todavía con 4 imports a features + 2 a auth, hay que cortarlos)
│   ├── i18n/                 ✅ (ex i18next)
│   ├── lib/                  ✅ (prisma, utils, rate-limit, serverAuth; ex src/lib + common/utils + actions/{auth,shared}.ts)
│   ├── errors/               ✅ (ex common/errors)
│   ├── hooks/                ✅ (ex common/hooks)
│   └── preferences/          ✅ (paso 2 — ex modules/Theme, modules/LanguageToggle, modules/TypeOfView;
│       ├── theme/             transversales, no son dominio Kanban en sí)
│       ├── language/
│       └── view-mode/
└── (se elimina src/views/, ex src/pages/ — ver punto 3, paso 5)

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

### Estructura interna por feature — ejemplo real con `tags/` (paso 2)

```
features/tags/
├── ui/
│   ├── EnableTags.tsx
│   └── TagGroupSelect.tsx
├── model/
│   ├── tags.ts                  (tipos: Tag, TagGroup)
│   ├── defaultTags.ts
│   ├── getHighestPriority.ts
│   └── translateTagGroup.ts
├── api/
│   ├── actions/                 (Server Actions de esta feature, ex src/actions/tags/)
│   │   ├── getActiveTagGroup.ts
│   │   └── setActiveTagGroup.ts
│   └── repository/
│       ├── tagRepository.ts     (interfaz — puerto)
│       ├── localstorageTagRepository.ts
│       ├── nextjsTagRepository.ts
│       └── tagRepositoryFactory.ts   (elige local vs nextjs según sesión)
├── hooks/
│   ├── useActualTagGroup.tsx
│   ├── useAvailableTags.tsx
│   ├── useTagsQuery.tsx
│   └── useUserSelectedTags.tsx
├── state/
│   └── store.ts
└── index.ts                     (única API pública — nadie importa un archivo interno)
```

`notes/`, `dashboard/`, `usage-history/` y `boards/` siguen el mismo layout (con `useCase/` donde hay casos de uso con tests). El patrón repositorio (`LocalStorage*Repository` + `Nextjs*Repository` + factory) que ya tenían los módulos es el mecanismo de puertos/adaptadores que screaming architecture pide — el paso 2 lo puso consistente en `api/repository/` en todas las features, y las Server Actions en `api/actions/`. Los `nextjs*Repository` importan sus actions con `import()` dinámico relativo (`../actions/...`), no por barril.

---

## 3. Qué hacer con `src/views/` y `src/actions/`

**`src/views/`** (ex `src/pages/`): dado que Task 10 de la migración ya está completa y todas las rutas viven en `app/`, esta capa intermedia puede desaparecer. La lógica de composición de cada página (`BoardPage.tsx`, `UserDashboard.tsx`, etc.) se mueve directamente a `app/*/page.tsx`, o si preferís mantener los componentes de página separados de los archivos de ruta por testeabilidad, a `features/<feature>/ui/<Feature>Page.tsx` cuando la página pertenece claramente a una sola feature (ej. `TimeTracking.tsx` → `features/usage-history/ui/UsageHistoryPage.tsx`).

**`src/actions/`** (PR #179 + pasos 1 y 2): pasó de 5 archivos planos a un directorio por dominio; en el paso 2, cada dominio de una feature migrada se movió a `features/<feature>/api/actions/`. Lo que queda pertenece a `TaskBoard` (paso 3):

```
src/actions/
├── tasks/      (getTaskBoard, saveTaskBoard, createTask, updateTask, deleteTask,
│                moveTask, createColumn, deleteColumn, updateColumnName)
├── archive/    (getArchive, saveArchive — de ArchivedTasks; getArchivedNotes/saveArchivedNotes
│                ya se fueron a features/notes/api/actions/)
└── reminders/  (getReminders, saveReminders — ex carpeta board/, renombrada al quedar solo esto)
```

Ya movidos en el paso 2: `tags/` → `features/tags/api/actions/`, `notes/` → `features/notes/api/actions/`,
`board/{getBoards,createBoard,deleteBoard}` → `features/dashboard/api/actions/`,
`board/{getBoardById,updateBoardName}` → `features/boards/api/actions/`,
`board/{getUsageHistory,saveUsageHistory}` → `features/usage-history/api/actions/`.

Los guards de auth (`requireAuth` + `require{Board,Column,Task}Access`) están en **`src/shared/lib/serverAuth.ts`** (paso 1). En el paso 3, `tasks/`+`archive/`+`reminders/` se mueven a sus features (`features/{tasks,archived-tasks,reminders}/api/actions/`).

---

## 4. Plan de migración incremental (sin romper nada en el camino)

Igual que en `migration.md`, conviene ir feature por feature dejando la app siempre demoable, en vez de un big-bang. Orden sugerido (de menor a mayor riesgo/tamaño):

1. ~~**`shared/`**: mover `ui/`, `common/`, `lib/`, `i18next/` sin cambiar su contenido, solo actualizar imports.~~ — **COMPLETO** (2026-09-02, commits `187728c0` `bb236571` `0bf3168b` `216ea90d` + move de guards). Quedó `src/shared/{ui,hooks,lib,errors,i18n}`; `src/actions/{auth,shared}.ts` → `src/shared/lib/serverAuth.ts`. `tsc` limpio, 75/75 tests. Los imports invertidos que el `git mv` arrastró (`shared/ui -> modules` ×7, `shared/ui -> auth` ×2, `shared/hooks -> {auth,modules/Theme}` ×3) se cortan en los pasos 2-4, no acá.
2. ~~**Features chicas y ya aisladas**: `Theme`, `LanguageToggle`, `TypeOfView`, `Dashboard`, `UsageHistory`, `notes`, `board` → `features/x` / `shared/preferences/x` con layout `ui/model/api/hooks`.~~ — **COMPLETO** (2026-09-02, 7 commits `5038972a`…`610a144f`). `Theme`/`LanguageToggle`/`TypeOfView` → `shared/preferences/`; `Dashboard`/`UsageHistory`/`notes`/`board`(→`boards`)/`tags` → `features/`. Cada `src/actions/<dominio>/` de esas features → `features/<feature>/api/actions/`. `src/actions/board/` → `src/actions/reminders/`. `tsc` limpio, 75/75 tests, `next build` OK.
3. **Romper `TaskBoard`**: extraer `Columns`, `Reminder`, `Tags`, `ArchivedTasks` como features top-level (y dejar el núcleo de `taskList` como la feature `tasks`). `Tags` ya salió en el paso 2 (`features/tags/`). Falta `Columns`, `Reminder`, `ArchivedTasks`, `tasks`. Es el paso de mayor superficie: `TaskBoard` (106 archivos, el único módulo que queda) se parte en ~4 features nuevas, pero cada una ya tiene sus límites claros (modelo + repo + useCase propios). Mover también `src/actions/{tasks,archive,reminders}/` a sus features.
4. **`auth`** → `features/auth`, resolviendo `auth -> features/{boards,notes}` + `auth -> modules/TaskBoard` (3, en `checkIfUserHasTheDefaultBoard.ts`) y de paso `shared/ui -> auth` (2, mover `useSession`/`useBoardId` fuera de `Header` o inyectarlos por props), `shared/hooks -> auth` (1, `SessionType` type-only en `useLoadingTimeout`) y `shared/ui -> features/{notes,usage-history,tags}` (4, en `Header`/`BlankTask`).
5. **Eliminar `src/views/`** (ex `src/pages/`), mover composición a `app/` o a la feature dueña.
6. ~~**Decidir `actions/`**~~ — hecho (PR #179 + pasos 1-2): split por dominio; guards de auth en `shared/lib/serverAuth.ts`; las actions de las features migradas en el paso 2 ya están en `features/<feature>/api/actions/`. Resta mover `src/actions/{tasks,archive,reminders}/` en el paso 3.
7. **Reindexar codegraph** (`codegraph index`) después de cada paso y verificar que las dependencias invertidas de la sección 1 desaparecieron. El índice se desactualiza con cualquier `git mv`, así que conviene reindexar antes de leerlo.

Cada paso se puede validar con `npm run build`, `npm run test` y `npm run test:e2e` antes de pasar al siguiente, igual que hicieron en la migración a Next.js.

---

## 5. Decisiones ya tomadas

- `Theme` / `LanguageToggle` / `TypeOfView` → `shared/preferences/{theme,language,view-mode}` (transversal, no son dominio Kanban). **Aplicado** (paso 2).
- `actions/` → distribuido por dominio. **Aplicado** (PR #179 + pasos 1-2): las actions de features migradas viven en `features/<feature>/api/actions/`; `src/actions/` quedó solo con `tasks/`+`archive/`+`reminders/` (paso 3). Los guards de auth en `shared/lib/serverAuth.ts` (paso 1).
- Dentro de `api/`: subdividido en **`actions/`** (Server Actions) y **`repository/`** (puertos + adaptadores + factory). Decidido y aplicado en el paso 2 (`notes` primero, después el resto).
- **`shared/` → COMPLETO** (paso 1): `src/ui` `src/common` `src/lib` `src/i18next` consolidados en `src/shared/`; `actions/{auth,shared}.ts` → `shared/lib/serverAuth.ts`.
- **features chicas + `shared/preferences/` → COMPLETO** (paso 2): `notes`, `tags`, `dashboard`, `usage-history`, `boards` en `src/features/`; `theme`, `language`, `view-mode` en `src/shared/preferences/`. `tsc` limpio, 75/75 tests, `next build` OK.

Estado: **pasos 1 y 2 completos**. Siguiente: paso 3 (romper `TaskBoard` — extraer `Columns`/`Reminder`/`ArchivedTasks`/`tasks`, y mover `src/actions/{tasks,archive,reminders}/`).
