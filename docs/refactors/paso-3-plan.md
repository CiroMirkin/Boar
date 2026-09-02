# Paso 3 — Romper `TaskBoard` en features

Plan de ejecución del **paso 3** de `arquitectura-propuesta.md`. Tras los pasos 1
y 2, `src/modules/` quedó con un solo módulo (`TaskBoard`, ~106 archivos) que por
dentro vuelve a una organización técnica anidada 6-7 niveles. Este paso lo parte
en features top-level con el layout del paso 2 (`ui/ model/ api/{actions,repository}/
hooks/ useCase/` + `index.ts` como única API pública) y mueve las Server Actions
restantes (`src/actions/{tasks,archive,reminders}/`) junto a su feature.

## Decisiones para este paso

- **`Columns` NO es feature propia.** El acoplamiento con `tasks` es circular
  (`taskBoard.ts` → `taskList/models`; `Columns/hooks/useColumnList` →
  `useTaskBoardQuery`; `taskList/components/*` → `Columns/hooks/*`). El agregado
  raíz es el board (`TaskBoard = TaskColumn[]`, cada columna contiene sus tareas).
  `Columns/` se pliega como carpetas internas de `features/tasks/`.
- **Un PR por sub-feature**, riesgo creciente:
  `reminders` → `archived-tasks` → `tasks` (núcleo + Columns).
  Cada PR: `npx tsc --noEmit` limpio · `npm test` 75/75 · `npm run build` exit 0 ·
  `codegraph sync`.
- **codegraph**: `codegraph sync` tras cada PR (no full `index`).
- **`api/actions/` sin barril**: `nextjs*Repository` hace `await import('../actions/<file>')`
  (patrón ya usado en `features/notes`).
- Commits de una línea, sin trailers (CLAUDE.md).

## Fuera de alcance (paso 4)

Las violaciones `shared/ui → features` (`shared/ui/organisms/BlankTask.tsx`) y
`auth → features` (`auth/utils/checkIfUserHasTheDefaultBoard.ts`) solo se
**reescriben los paths** acá; se resuelven de fondo en el paso 4.

---

## PR 1 — `features/reminders/`

`Reminder/` es independiente (0 cross-refs con el resto de TaskBoard). Sus únicos
imports externos: `@/shared/*`, `@/auth/*` (válidos) y `@/actions/reminders`.

### Moves

| Origen | Destino |
|---|---|
| `modules/TaskBoard/components/Reminder/CreateReminder.tsx` | `features/reminders/ui/CreateReminder.tsx` |
| `modules/TaskBoard/components/Reminder/ReminderList.tsx` | `features/reminders/ui/ReminderList.tsx` |
| `modules/TaskBoard/components/Reminder/model/reminder.ts` | `features/reminders/model/reminder.ts` |
| `modules/TaskBoard/components/Reminder/state/store.ts` | `features/reminders/state/store.ts` |
| `modules/TaskBoard/components/Reminder/hooks/*.tsx` | `features/reminders/hooks/*.tsx` |
| `modules/TaskBoard/components/Reminder/repository/*.ts` | `features/reminders/api/repository/*.ts` |
| `src/actions/reminders/{getReminders,saveReminders}.ts` | `features/reminders/api/actions/` (sin `index.ts`) |

### Reescrituras de import

- `ui/CreateReminder.tsx`, `ui/ReminderList.tsx`: `./model/` → `../model/`,
  `./hooks/` → `../hooks/`.
- `hooks/*.tsx`: `../repository/ReminderRepositoryFactory` → `../api/repository/ReminderRepositoryFactory`;
  `../model/`, `../state/` quedan igual.
- `api/repository/*.ts`: `../model/reminder` → `../../model/reminder`.
- `api/repository/nextjsReminderRepository.ts`:
  `await import('@/actions/reminders')` → `await import('../actions/getReminders')` /
  `await import('../actions/saveReminders')`.
- `api/actions/{getReminders,saveReminders}.ts`:
  `@/modules/TaskBoard/components/Reminder/model/reminder` → `../../model/reminder`.
- `features/reminders/index.ts` (nuevo): `CreateReminder` (default),
  `ReminderList`, `useReminder`, `Reminder` (tipo), `blankReminder` — ajustar al
  uso real en las views.
- `views/BoardPage.tsx`: `useReminder` → `@/features/reminders`.
- `views/Settings.tsx`: `CreateReminder`, `ReminderList` → `@/features/reminders`.

Borrar `modules/TaskBoard/components/Reminder/` y `src/actions/reminders/`.

---

## PR 2 — `features/archived-tasks/`

`ArchivedTasks/` ya tiene modelo + repo (puerto + 2 adaptadores + `index.ts`
factory) + `useCase/` con tests. Depende de `tasks` (útiles de `taskList` + el
hook `useCheckForTasksInLastColumn` de `Columns`), nunca al revés.

> **Orden:** este PR necesita que `features/tasks/index.ts` ya exponga su API.
> Ejecutar **PR 3 antes que PR 2**, o juntarlos. Se renumera en ejecución.

### Moves

```
modules/TaskBoard/components/taskList/components/ArchivedTasks/
  ArchivedTasks.tsx            → features/archived-tasks/ui/ArchivedTasks.tsx
  components/*.tsx             → features/archived-tasks/ui/*.tsx
  downloadArchiveLikePDF.ts    → features/archived-tasks/model/downloadArchiveLikePDF.ts
  hooks/*.tsx                  → features/archived-tasks/hooks/
  models/archive.ts           → features/archived-tasks/model/archive.ts
  repository/*.ts              → features/archived-tasks/api/repository/
  useCase/*.ts (+ *.test.ts)   → features/archived-tasks/useCase/
src/actions/archive/{getArchive,saveArchive}.ts → features/archived-tasks/api/actions/
```

### Reescrituras

- Imports a `taskList`/`Columns` internos → `@/features/tasks` (público):
  `addTaskInTheLastColumn`, `sortListOfTasksInColumnsByPriority`,
  `addChangeToTaskTimelineHistory`, `addChangeToEachTaskInList`,
  `useTaskListInEachColumn`, `useCheckForTasksInLastColumn`,
  `TaskTimelineHistory` (tipo), `taskModel`.
- `api/repository/nextjsArchiveRepository.ts`:
  `await import('@/actions/archive')` → `await import('../actions/<file>')`.
- `api/actions/*`: `import type { Archive }` → `../../model/archive`.
- `features/archived-tasks/index.ts`: `ArchivedTasks`, `ArchiveTaskListButton`
  (lo usa `views/BoardPage.tsx`), `cleanArchive` si se usa fuera.
- `views/BoardArchive.tsx`, `views/BoardPage.tsx`: paths → `@/features/archived-tasks`.

Borrar la carpeta `ArchivedTasks/` y `src/actions/archive/`.

---

## PR 3 — `features/tasks/` (núcleo + Columns) — el grande

Todo lo que queda de `modules/TaskBoard/` tras PR 1 y 2.

### Mapa de moves (patrón, no exhaustivo)

| Origen dentro de `modules/TaskBoard/` | Destino `features/tasks/` |
|---|---|
| `model/{task,taskBoard,TaskList,taskColumn}.ts` | `model/` |
| `components/taskList/models/*.ts` (+ tests) | `model/` |
| `components/Columns/model/*.ts` | `model/` |
| `repository/*.ts` | `api/repository/` |
| `src/actions/tasks/*.ts` | `api/actions/` |
| `hooks/useTaskBoardQuery.tsx` | `hooks/` |
| `components/taskList/hooks/*.tsx` | `hooks/` |
| `components/Columns/hooks/*.tsx` | `hooks/` |
| `useCase/*.ts` (+ tests) | `useCase/` |
| `components/taskList/useCase/*.ts` (+ tests) | `useCase/` |
| `components/taskList/{TaskListInEachColumn.tsx,components/*}` | `ui/` |
| `components/Columns/{ListOfColumns.tsx,components/*}` | `ui/` |
| `components/Columns/context/ColumnsFooter/*` | `ui/columnsFooter/` |
| `components/{ListView,TableView}.tsx` | `ui/` |

### Reescrituras

- Todo `@/modules/TaskBoard/...` → relativo o `@/features/tasks/...`.
- `api/repository/index.ts` + `nextjsTaskListRepository.ts`:
  `import type { SessionType }` de `@/auth/...` se mantiene;
  `await import('@/actions/tasks')` → `await import('../actions/<file>')`.
- `hooks/useTaskBoardQuery.tsx`: `useSession` de `@/auth/hooks/useSession` se mantiene.
- `features/tasks/index.ts` — API pública mínima (views + PR 1/2):
  - tipos/modelo: `taskModel`, `emptyTask`, `TaskBoard`, `emptyTaskBoard`,
    `isDefaultTaskBoard`, `joinTaskListsAndTaskBoard`, `TaskListInEachColumn` +
    type-guards, `TaskTimelineHistory`, `Column`
  - useCase: `addTaskInTheLastColumn`, `sortListOfTasksInColumnsByPriority`,
    `addChangeToTaskTimelineHistory`, `addChangeToEachTaskInList`
  - hooks: `useTaskBoardQuery`, `useTaskListInEachColumn`, `useCheckForTasksInLastColumn`
  - ui: `TaskListInEachColumn`, `AddNewTaskInput`, `ListView`, `TableView`,
    `ConfigColumns`, `ListOfColumn`, `ColumnsContent`,
    `ColumnsFooterContentProvider`, `ColumnsFooterContent`
- `views/BoardPage.tsx`, `views/Settings.tsx`: paths de TaskBoard → `@/features/tasks`.
- `shared/ui/organisms/BlankTask.tsx`: `@/modules/TaskBoard/model/task` → `@/features/tasks`.
- `auth/utils/checkIfUserHasTheDefaultBoard.ts`: `@/modules/TaskBoard/model/taskBoard` → `@/features/tasks`.

Borrar `src/modules/` y `src/actions/` enteros. Confirmar que quedan vacíos.

---

## Actualizar el doc tras cada PR

`docs/refactors/arquitectura-propuesta.md`: marcar sub-feature `✅` en secciones
2 y 4, actualizar conteos (sección 1) y "Estado" (sección 5). Tras PR 3: sección 1
pasa a decir que `modules/` y `actions/` ya no existen; siguiente = paso 4
(`auth` → `features/auth`) + paso 5 (eliminar `views/`). Registrar la divergencia
de `Columns` (plegado en `tasks`) en "Decisiones ya tomadas".

## Verificación end-to-end (tras PR 3)

```
npx tsc --noEmit                      # 0 errores
npm test                              # 75/75
npm run build                         # exit 0
npm run test:e2e                      # board, archive, settings, reminders OK
codegraph sync && codegraph status
grep -rn "@/modules\|@/actions" src app e2e   # 0 resultados
```
