# Capo — Propuesta de reorganización a arquitectura screaming modular

Documento generado a partir del análisis del repo con codegraph. Los pasos 1 (`shared/`), 2 (features chicas + `shared/preferences/`), 3 (romper `TaskBoard`), 4 (`auth` → `features/auth`) y 5 (eliminar `src/views/`) están **COMPLETOS**. Siguiente: paso 7 (`codegraph sync`).

> **Revisión 2026-09-02 (paso 5 COMPLETO):** `src/views/` **ya no existe**. Los 11 archivos se movieron al árbol de `app/`:
> - **Chrome de página compartido → `app/_components/`** (carpeta privada de Next, fuera del routing): `Header.tsx`, `PageContainer.tsx`, `Erro404.tsx` (ex `404.tsx`, renombrado a identificador válido).
> - **Composición de cada página → co-locada con su ruta**: `Auth.tsx`, `BoardArchive.tsx`, `BoardPage.tsx`, `Settings.tsx`, `TimeTracking.tsx` junto a su `page.tsx`; `UserDashboard.tsx` en `app/`, `UserDashboardSettings.tsx` en `app/settings/`, `Help.tsx` en `app/help/`. Cada `page.tsx` sigue siendo un wrapper fino (`import` relativo `./X` en vez de `@/views/X`).
> - No se movió composición a `features/<feature>/ui/` (opción que daba la sección 3): toda página monta el chrome de `app/_components/`, y una feature no puede importar de `app/` sin invertir la dependencia. Las páginas de una sola feature (`TimeTracking` → usage-history) igual quedan en `app/` por eso.
> - Imports a chrome desde las páginas co-locadas: relativos (`../_components/…`, `../../_components/…`). `@/*` sigue mapeando solo a `src/*`.
> - **Verificación:** `tsc --noEmit` limpio · 75/75 tests · `next build` OK · `grep -rn "@/views\|views/" src app e2e` → 0 resultados.
> - codegraph **pendiente de reindexar** (`codegraph sync`).

> **Revisión 2026-09-02 (paso 4 COMPLETO):** `src/auth/` **ya no existe** — es `src/features/auth/` (`ui/ model/ hooks/ state/ contexts/` + `index.ts` como única API pública). Rama `refactor/paso-4-auth`. `tsc --noEmit` limpio, 75/75 tests, `next build` exit 0.
> - **Todas las dependencias invertidas de la sección 1 resueltas** (`grep -rn "@/features/\|@/auth" src/shared/` → 0):
>   - `shared/ui/organisms/BlankTask.tsx` → `features/tasks/ui/BlankTask.tsx` (expuesto en el barril con `TaskContext`). Consumidores en `archived-tasks` usan `@/features/tasks`; los internos de `tasks` usan ruta relativa.
>   - `shared/ui/organisms/Header.tsx` → `src/views/Header.tsx` (chrome de página; solo lo usan `views/`). Se irá a `app/` en el paso 5.
>   - `shared/preferences/language/ui/LogInAndLogOutMenuItem.tsx` → `features/auth/ui/` (estaba mal ubicada; no tiene nada de idioma). `Header` la importa de `@/features/auth`.
>   - `shared/hooks/useLoadingTimeout.tsx`: prop `session` pasó a tipo estructural local (`{ user?: { id?: string } } | null`), sin import de auth.
> - **Ciclo aceptado:** `features/auth/model/checkIfUserHasTheDefaultBoard.ts` importa los barriles de `features/{boards,notes,tasks}` (constantes puras `isDefaultBoardName`/`defaultNotes`/`emptyTaskBoard`). Esas features importan `@/features/auth` (`useSession`/`useBoardId`) → ciclo `auth` ⇄ `{boards,notes,tasks}`, inherente al chequeo cross-feature, mismo criterio que `tasks` ⇄ `archived-tasks` (paso 3). Sin hooks en la ruta → sin hazard de init; `next build` OK.
> - `getUserId.ts` (stub muerto, 0 consumidores) eliminado.
> - Las 8 features siguen consumiendo `useSession`/`useBoardId`/`SessionType` — ahora vía el barril `@/features/auth` en vez de rutas profundas a `@/auth/*`.
> - Conteos: `features/` 221 (`auth` 12, `tasks` 81, resto igual); `shared/` 71 (`ui/` 33); `views/` 11 (+`Header.tsx`).
> - codegraph **pendiente de reindexar** (`codegraph sync`).

> **Revisión 2026-09-02 (paso 3 COMPLETO):** `src/modules/` y `src/actions/` **ya no existen**. `TaskBoard` se partió en:
> - **`src/features/tasks/`** (80) — el board Kanban: núcleo de `taskList` + `Columns` plegado adentro. Layout `ui/ model/ api/{actions,repository}/ hooks/ useCase/` + `index.ts`. `Columns` quedó como `ui/Columns/` (con sus `model/ hooks/`), no feature propia: el acoplamiento con `tasks` es circular y el agregado raíz es el board.
> - **`src/features/archived-tasks/`** (27) — subdominio del archivo, con modelo/repo/useCase/actions propios. Depende de `features/tasks` vía su `index.ts`. El bridge `ArchiveTaskButton` (archivar una tarea del board) vive acá; `taskList/TaskInBoardActions` lo importa vía `@/features/archived-tasks`. Hay un ciclo `tasks` ⇄ `archived-tasks` inherente al dominio (ESM lo resuelve; ambos barriles son solo re-exports).
> - `src/actions/{tasks,archive}/` → `features/{tasks,archived-tasks}/api/actions/` (sin barril; `nextjs*Repository` usa `await import('../actions/<file>')`).
> - PRs: `refactor/paso-3-reminders` (PR 1) + `refactor/paso-3-tasks` (PR 2, `tasks` + `archived-tasks` juntos por estar `ArchivedTasks` físicamente dentro de `taskList/components/`). Un PR por sub-feature, riesgo creciente `reminders → archived-tasks → tasks`. Hooks muertos `useGetReminder`/`useSaveReminder` eliminados.
> - **Por qué `Columns` no es feature propia:** tres ciclos concretos con `tasks` — `model/taskBoard.ts → taskList/models`; `Columns/hooks/useColumnList → useTaskBoardQuery`; `taskList/components/* → Columns/hooks/*`. El agregado raíz es el board (`TaskBoard = TaskColumn[]`, cada columna contiene sus tareas), así que `Columns/` se plegó como carpetas internas de `features/tasks/` (`ui/Columns/` + su `model/ hooks/`).
> - `api/actions/` sin barril: los `nextjs*Repository` hacen `await import('../actions/<file>')` (patrón de `features/notes`). `codegraph sync` tras cada PR (no full `index`).
> - **Verificación:** `tsc --noEmit` limpio · 75/75 tests · `next build` exit 0 · e2e OK (board, archive, settings, reminders) · `grep -rn "@/modules\|@/actions" src app e2e` → 0 resultados.
> - **Pendiente (paso 4):** `shared/ui/organisms/BlankTask.tsx` y `auth/utils/checkIfUserHasTheDefaultBoard.ts` ahora importan `@/features/tasks` (paths reescritos; la violación de dependencia se resuelve de fondo en el paso 4).
> - Conteos: `features/` 208 (`tasks` 80, `archived-tasks` 27, `notes` 24, `usage-history` 21, `tags` 19, `reminders` 13, `boards` 13, `dashboard` 11).

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

`src/` se divide hoy así (tras pasos 1, 2, 3, 4 y 5):

| Carpeta | Archivos | Rol |
|---|---|---|
| `features/` | 221 | Features autocontenidas — `tasks` 81, `archived-tasks` 27, `notes` 24, `usage-history` 21, `tags` 19, `reminders` 13, `boards` 13, `auth` 12, `dashboard` 11 |
| `shared/` | 71 | Capa compartida — `ui/` 33, `preferences/` 16 (`theme` 6, `language` 5, `view-mode` 5), `lib/` 9, `hooks/` 8, `i18n/` 4, `errors/` 1 |

`src/modules/`, `src/actions/`, `src/auth/` (paso 4) y `src/views/` (paso 5) **ya no existen**. `TaskBoard` se partió (paso 3) en `features/tasks/` (núcleo `taskList` + `Columns` plegado) y `features/archived-tasks/`. `auth` es ahora `features/auth/` con `index.ts` como única API pública. La composición de páginas y el chrome (`Header`, `PageContainer`) viven en `app/` (paso 5): chrome compartido en `app/_components/`, composición co-locada con cada `page.tsx`.

**El diagnóstico central original (`modules/TaskBoard` concentraba ~64% del código de dominio en una jerarquía técnica anidada 6-7 niveles) está resuelto.** Contexto histórico de la estructura previa:

```
modules/TaskBoard/components/taskList/components/ArchivedTasks/repository/nextjsArchiveRepository.ts
modules/TaskBoard/components/taskList/components/Tags/repository/nextjsTagRepository.ts
modules/TaskBoard/components/Reminder/repository/nextjsReminderRepository.ts
```

`ArchivedTasks`, `Tags`, `Reminder` y `Columns` no son detalles de `taskList` — son subdominios propios, cada uno con su propio modelo, repositorio (local/Nextjs + factory) y casos de uso. Hoy están enterrados 4-5 carpetas adentro de `TaskBoard/components/taskList/components/`, cuando deberían ser hermanos al mismo nivel que `TaskBoard`.

### Violaciones de dependencia detectadas (vía grafo de imports)

Aparecían dependencias invertidas — capas "hoja" (sin conocer al dominio) importando desde el dominio. **El paso 4 las resolvió todas** (grep sobre el árbol: `grep -rn "@/features/" src/shared/` y `grep -rn "@/auth" src/shared/` → 0).

| Origen | Destino | Estado | Cómo se resolvió |
|---|---|---|---|
| `shared/ui/organisms/BlankTask` | `features/tasks/model/task`, `features/tags` | ✅ paso 4 | `BlankTask` era UI de tarea, no design system → `features/tasks/ui/BlankTask.tsx` (expuesto en el barril con `TaskContext`) |
| `shared/ui/organisms/Header` | `auth`, `features/notes`, `features/usage-history` | ✅ paso 4 | `Header` es chrome de página (solo lo usa `views/`) → `src/views/Header.tsx` |
| `shared/preferences/language/ui/LogInAndLogOutMenuItem` | `auth` (`useBoardId`, `SessionType`) | ✅ paso 4 | Ítem de menú de auth mal ubicado en `language/` → `features/auth/ui/`; `Header` lo importa de `@/features/auth` |
| `shared/hooks/useLoadingTimeout` | `auth` — `SessionType` (type-only) | ✅ paso 4 | El hook solo mira `user?.id` → tipo local `{ user?: { id?: string } } \| null`, sin import |
| `shared/hooks/useTheme` | `modules/Theme` | ✅ paso 2 | `→ shared/preferences/theme` |
| `auth/utils/checkIfUserHasTheDefaultBoard` | `features/{boards,notes,tasks}` | ⚠️ ciclo aceptado (paso 4) | Ver "Decisiones ya tomadas": chequeo inherentemente cross-feature; usa solo los barriles públicos, mismo criterio que `tasks` ⇄ `archived-tasks` en paso 3 |
| `actions -> views` / `ui -> views` | | ✅ paso previo | PR #179 / fix boardId por ruta |

No cuentan como violación bajo la arquitectura destino: `features/auth -> shared/ui` (una feature puede usar `shared/ui`) y `actions -> */model` type-only.

### Capa `views/` (ex `pages/`) duplicada — ✅ resuelta (paso 5)

`src/views/*.tsx` era una capa intermedia envuelta por `app/*/page.tsx`, remanente de la migración de React Router a App Router (`migration.md`, Task 10). El paso 5 la eliminó: la composición de cada página se co-locó con su `page.tsx` y el chrome compartido (`Header`, `PageContainer`, `Erro404`) se movió a `app/_components/`. Cada `page.tsx` quedó como wrapper fino con `import` relativo.

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
│   ├── tasks/                ✅ (ex TaskBoard/components/taskList + Columns plegado + BlankTask — pasos 3 y 4)
│   ├── archived-tasks/       ✅ (ex TaskBoard/.../ArchivedTasks — paso 3)
│   ├── tags/                 ✅ (ex TaskBoard/.../Tags — subió a top-level en el paso 2)
│   ├── reminders/            ✅ (ex TaskBoard/components/Reminder — paso 3)
│   ├── notes/                ✅ (incluye LibraryOfArchiveNotes aplanado como ui/model/api)
│   ├── usage-history/        ✅
│   ├── dashboard/            ✅ (listado de boards del usuario)
│   └── auth/                 ✅ (ex src/auth — paso 4; ui/ model/ hooks/ state/ contexts/ + index.ts)
├── shared/                   ✅ (pasos 1, 2 y 4) — sin imports invertidos
│   ├── ui/                   ✅ (ex src/ui — design system puro, ya no conoce features ni auth)
│   ├── i18n/                 ✅ (ex i18next)
│   ├── lib/                  ✅ (prisma, utils, rate-limit, serverAuth; ex src/lib + common/utils + actions/{auth,shared}.ts)
│   ├── errors/               ✅ (ex common/errors)
│   ├── hooks/                ✅ (ex common/hooks)
│   └── preferences/          ✅ (paso 2 — ex modules/Theme, modules/LanguageToggle, modules/TypeOfView;
│       ├── theme/             transversales, no son dominio Kanban en sí)
│       ├── language/
│       └── view-mode/
└── (src/views/ eliminado en el paso 5 — composición en app/, chrome en app/_components/)

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

**`src/views/`** (ex `src/pages/`): **eliminado en el paso 5.** La composición de cada página se co-locó con su `page.tsx` (ej. `app/board/[id]/BoardPage.tsx`), y el chrome compartido (`Header`, `PageContainer`, `Erro404`) se movió a `app/_components/` (carpeta privada de Next). No se usó `features/<feature>/ui/<Feature>Page.tsx` — que la sección planteaba como alternativa — porque toda página monta el chrome de `app/_components/` y una feature no puede importar de `app/` sin invertir la dependencia.

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
3. ~~**Romper `TaskBoard`**~~ — **COMPLETO** (2026-09-02, ver revisión al inicio de este doc). `TaskBoard` → `features/tasks/` (núcleo `taskList` + `Columns` plegado como `ui/Columns/`) + `features/archived-tasks/`. `Tags` ya había salido en el paso 2. `src/modules/` y `src/actions/` eliminados. `src/actions/{tasks,archive}/` → `features/{tasks,archived-tasks}/api/actions/`.
   - ~~PR 1 `reminders`~~ — rama `refactor/paso-3-reminders`. Hooks muertos `useGetReminder`/`useSaveReminder` eliminados.
   - ~~PR 2 `tasks` + `archived-tasks`~~ — rama `refactor/paso-3-tasks`. Juntos porque `ArchivedTasks` estaba físicamente dentro de `taskList/components/`. `Columns` plegado en `tasks`. Bridge `ArchiveTaskButton` → `features/archived-tasks/ui/`. Ciclo `tasks` ⇄ `archived-tasks` inherente (ESM lo resuelve). `tsc` limpio, 75/75 tests, `next build` OK.
4. ~~**`auth`** → `features/auth`~~ — **COMPLETO** (2026-09-02, rama `refactor/paso-4-auth`). `src/auth/` → `src/features/auth/` (`ui/ model/ hooks/ state/ contexts/` + `index.ts`; `getUserId.ts` muerto eliminado). Violaciones invertidas cortadas: `BlankTask` → `features/tasks/ui/`, `Header` → `views/`, `LogInAndLogOutMenuItem` → `features/auth/ui/`, `useLoadingTimeout` con tipo `session` local. Queda el ciclo `features/auth` ⇄ `features/{boards,notes,tasks}` en `checkIfUserHasTheDefaultBoard.ts`, aceptado como inherente (solo barriles públicos, mismo criterio que `tasks` ⇄ `archived-tasks`). `tsc` limpio, 75/75 tests, `next build` exit 0.
5. ~~**Eliminar `src/views/`**~~ — **COMPLETO** (2026-09-02, ver revisión al inicio de este doc). Los 11 archivos → árbol de `app/`: chrome compartido (`Header`, `PageContainer`, `Erro404`) → `app/_components/`; composición de página co-locada con cada `page.tsx`. No se usó `features/<feature>/ui/` porque toda página monta el chrome de `app/_components/` y una feature no puede importar de `app/`. `tsc` limpio, 75/75 tests, `next build` OK.
6. ~~**Decidir `actions/`**~~ — **COMPLETO**: split por dominio (PR #179), luego cada dominio a su feature (pasos 2-3). `src/actions/` eliminado. Guards de auth en `shared/lib/serverAuth.ts`.
7. **Sincronizar codegraph** (`codegraph sync`) después de cada paso/PR y verificar que las dependencias invertidas de la sección 1 desaparecieron. El índice se desactualiza con cualquier `git mv`, así que conviene sincronizar antes de leerlo.

Cada paso se puede validar con `npm run build`, `npm run test` y `npm run test:e2e` antes de pasar al siguiente, igual que hicieron en la migración a Next.js.

---

## 5. Decisiones ya tomadas

- `Theme` / `LanguageToggle` / `TypeOfView` → `shared/preferences/{theme,language,view-mode}` (transversal, no son dominio Kanban). **Aplicado** (paso 2).
- `actions/` → distribuido por dominio. **Aplicado** (PR #179 + pasos 1-2): las actions de features migradas viven en `features/<feature>/api/actions/`; `src/actions/` quedó solo con `tasks/`+`archive/`+`reminders/` (paso 3). Los guards de auth en `shared/lib/serverAuth.ts` (paso 1).
- Dentro de `api/`: subdividido en **`actions/`** (Server Actions) y **`repository/`** (puertos + adaptadores + factory). Decidido y aplicado en el paso 2 (`notes` primero, después el resto).
- **`shared/` → COMPLETO** (paso 1): `src/ui` `src/common` `src/lib` `src/i18next` consolidados en `src/shared/`; `actions/{auth,shared}.ts` → `shared/lib/serverAuth.ts`.
- **features chicas + `shared/preferences/` → COMPLETO** (paso 2): `notes`, `tags`, `dashboard`, `usage-history`, `boards` en `src/features/`; `theme`, `language`, `view-mode` en `src/shared/preferences/`. `tsc` limpio, 75/75 tests, `next build` OK.
- **`Columns` plegado dentro de `features/tasks/`** (paso 3) — no es feature propia. El acoplamiento `tasks`↔`columns` es circular y el agregado raíz es el board (`TaskBoard = TaskColumn[]`, cada columna contiene sus tareas). Diverge de la sección 2 original, que lo listaba como `features/columns/`.
- **`ArchivedTasks` → `features/archived-tasks/`** (paso 3), pero con ciclo `tasks` ⇄ `archived-tasks` aceptado como inherente al dominio (el bridge `ArchiveTaskButton` vive en `archived-tasks`; `archived-tasks` consume `@/features/tasks`). Ambos barriles son solo re-exports, ESM resuelve el ciclo.
- **`TaskBoard` → COMPLETO** (paso 3): `src/modules/` y `src/actions/` eliminados.
- **`auth` → `features/auth` → COMPLETO** (paso 4): `ui/ model/ hooks/ state/ contexts/` + `index.ts`. `getUserId.ts` (stub muerto, 0 consumidores) eliminado. Las features siguen consumiendo `useSession`/`useBoardId`/`SessionType` — ahora vía el barril `@/features/auth`.
- **`checkIfUserHasTheDefaultBoard` se queda en `features/auth/model/`** (paso 4) con el ciclo `features/auth` ⇄ `features/{boards,notes,tasks}` aceptado como inherente: el chequeo "¿el invitado perdería datos al iniciar sesión?" abarca 3 dominios por naturaleza y solo importa 3 constantes puras (`isDefaultBoardName`, `defaultNotes`, `emptyTaskBoard`) de los barriles públicos, sin hooks → sin hazard de init. Mismo criterio que `tasks` ⇄ `archived-tasks` (paso 3).
- **`Header` → `src/views/`** (paso 4): es chrome de página (solo lo montan `views/PageContainer`, `404`, `Help`), no design system. Se irá a `app/` en el paso 5.
- **`BlankTask` → `features/tasks/ui/`** (paso 4): tarjeta de tarea, no primitiva de UI. Expuesta en `features/tasks/index.ts` junto con `TaskContext`.
- **`LogInAndLogOutMenuItem` → `features/auth/ui/`** (paso 4): estaba mal ubicada en `shared/preferences/language/ui/` (no tiene nada de idioma). `Header` la importa de `@/features/auth`.
- **`useLoadingTimeout` sin dependencia de auth** (paso 4): el hook solo lee `session?.user?.id`, así que su prop `session` pasó a un tipo estructural local (`{ user?: { id?: string } } | null`).
- **`src/views/` eliminado** (paso 5): chrome compartido (`Header`, `PageContainer`, `Erro404`) → `app/_components/`; composición de página co-locada con cada `page.tsx`. Cada `page.tsx` quedó como wrapper fino con `import` relativo. No se movió nada a `features/<feature>/ui/`: toda página monta el chrome de `app/_components/` y una feature no puede importar de `app/`.

Estado: **pasos 1, 2, 3, 4 y 5 completos.** Siguiente: paso 7 (`codegraph sync` y verificar que las dependencias invertidas de la sección 1 desaparecieron).
