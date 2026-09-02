---

## Implementation Plan — Migración Boar: React/Vite/Supabase → Next.js/Auth.js/Prisma Postgres

---

### Problem Statement

Migrar la app Boar (tablero Kanban) desde React + Vite + Supabase hacia Next.js 15 (App Router) con Auth.js para autenticación y Prisma Postgres como base de datos, usando Server Actions como capa de backend. Se normaliza el esquema: columnas y tareas dejan de ser un JSON blob para tener sus propias tablas. El modo guest con localStorage se mantiene.

---

### Requirements

- Migrar de Vite+React a Next.js 15 (App Router) en el mismo repositorio
- Reemplazar Supabase Auth por Auth.js (email/password + GitHub OAuth)
- Reemplazar Supabase DB por Prisma Postgres con Prisma Accelerate
- Crear tablas `Column` y `Task` normalizadas (Board → Columns → Tasks, con `order` en Column y `createdAt` en Task para ordenamiento)
- Tablas propias para cada accesorio: `Note`, `TagGroup`, `Reminder`, `Archive`
- `usageHistory` como campo `Json` directo en `Board`
- `TagGroup` es horizontal: un grupo puede estar activo en varios boards o en ninguno
- Mantener modo guest con localStorage
- Mantener React Query como capa de caché del cliente; Server Actions como mutation functions
- Eliminar tests unitarios de manipulación de arrays (reemplazados por Prisma); mantener tests de lógica de dominio pura
- Agregar tests unitarios para Server Actions con mocks de Prisma
- Tests e2e de usuarios autenticados fuera del scope
- Migración de datos Supabase → Prisma Postgres como tarea opcional

---

### Background

**Arquitectura actual:**
- Vite + React SPA con react-router-dom v6
- Supabase como BaaS: auth (email + GitHub OAuth), PostgreSQL con RLS, cliente JS directo desde el frontend
- Patrón repositorio: cada módulo tiene `Supabase*Repository` y `LocalStorage*Repository`, factory elige según sesión
- Tablas Supabase: `boards` (columnas/tareas como JSONB), `board_accessories` (notas, reminders, tags, historial), `archive`
- React Query para cache/mutations, Zustand para `boardId` global
- 6 repos Supabase: Board, TaskLists, Dashboard, Notes, UsageHistory, ArchivedTasks, Tags

**Nuevo schema Prisma:**

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  image     String?
  accounts  Account[]
  sessions  Session[]
  boards    Board[]
  createdAt DateTime @default(now())
}

model Board {
  id               String        @id @default(cuid())
  name             String
  userId           String
  user             User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  columns          Column[]
  note             Note?
  activeTagGroupId String?
  activeTagGroup   TagGroup?     @relation("ActiveTagGroup", fields: [activeTagGroupId], references: [id])
  reminders        Reminder?
  archive          Archive?
  usageHistory     Json          @default("[]")
  createdAt        DateTime      @default(now())
}

model Column {
  id      String  @id @default(cuid())
  name    String
  order   Int
  boardId String
  board   Board   @relation(fields: [boardId], references: [id], onDelete: Cascade)
  tasks   Task[]
}

model Task {
  id               String   @id @default(cuid())
  descriptionText  String
  columnId         String
  column           Column   @relation(fields: [columnId], references: [id], onDelete: Cascade)
  tags             Json?
  notesAndComments String?
  timelineHistory  Json?
  createdAt        DateTime @default(now())
}

model Note {
  id      String @id @default(cuid())
  content String @default("")
  boardId String @unique
  board   Board  @relation(fields: [boardId], references: [id], onDelete: Cascade)
}

model TagGroup {
  id             String  @id @default(cuid())
  tags           Json
  activeInBoards Board[] @relation("ActiveTagGroup")
}

model Reminder {
  id      String @id @default(cuid())
  data    Json
  boardId String @unique
  board   Board  @relation(fields: [boardId], references: [id], onDelete: Cascade)
}

model Archive {
  id       String @id @default(cuid())
  taskList Json   @default("[]")
  notes    Json   @default("{\"archive\": []}")
  boardId  String @unique
  board    Board  @relation(fields: [boardId], references: [id], onDelete: Cascade)
}

// Tablas requeridas por Auth.js
model Account { ... }
model Session { ... }
model VerificationToken { ... }
```

**Routing — React Router → Next.js App Router:**

| React Router | Next.js App Router |
|---|---|
| `/` | `app/page.tsx` |
| `/board/:id` | `app/board/[id]/page.tsx` |
| `/archive/:id` | `app/archive/[id]/page.tsx` |
| `/settings/:id` | `app/settings/[id]/page.tsx` |
| `/settings` | `app/settings/page.tsx` |
| `/time/:id` | `app/time/[id]/page.tsx` |
| `/help` | `app/help/page.tsx` |
| `/auth/:id?` | `app/auth/[[...id]]/page.tsx` |

**Tests:**
- Eliminar: tests unitarios de `addTask`, `deleteTask`, `moveTask`, `deleteTaskList`, `moveThisTaskToThisColumn` (lógica de arrays reemplazada por Prisma)
- Mantener: `addChangeToTaskTimelineHistory`, `NotesAndComments`, `updateDailyUsageRecord` (dominio puro)
- Agregar: tests unitarios para Server Actions con `vi.mock` de Prisma Client
- E2e: actualizar `baseURL` a `localhost:3000`; los tests existentes (modo guest) se ejecutan sin cambios

---

### Proposed Solution

Migración incremental en 11 tareas. Primero se monta el esqueleto Next.js funcional, luego se migra módulo a módulo reemplazando repositorios Supabase por Server Actions + Prisma. El patrón repositorio existente se preserva — solo se reemplazan las implementaciones. La app queda siempre en estado demoable.

---

### Task Breakdown

**Task 1: Setup Next.js en el mismo repo + configuración base**

- Objetivo: Reemplazar Vite por Next.js 15 manteniendo todo el código existente en `src/`
- Implementación:
  - Instalar `next@15`, eliminar `vite`, `@vitejs/plugin-react`, `vite.config.ts`, `index.html`
  - Crear `app/layout.tsx` con los providers actuales (`QueryClientProvider`, `ThemeProvider`, `SonnerToaster`). El `SessionProvider` de Supabase se reemplaza en Task 2; por ahora se mantiene temporalmente
  - Crear `app/page.tsx` que renderiza `<UserDashboard />`
  - Adaptar `tsconfig.json` para Next.js: agregar plugin `next`, mantener paths `@/*`
  - Actualizar `tailwind.config.js`, `postcss.config.js` para Next.js
  - Crear `next.config.ts`
  - Actualizar scripts en `package.json`: `dev` → `next dev`, `build` → `next build`, agregar `start` → `next start`
  - Actualizar `playwright.config.ts`: `baseURL` → `http://localhost:3000`, `webServer.url` → `http://localhost:3000`
- Tests: `npm run build` compila sin errores; `npm run dev` levanta en `localhost:3000`
- Demo: La app se ve y funciona igual que antes pero corriendo sobre Next.js. Supabase sigue activo temporalmente.

---

**Task 2: Instalar y configurar Auth.js (email/password + GitHub OAuth)**

- Objetivo: Reemplazar Supabase Auth por Auth.js
- Implementación:
  - Instalar `next-auth@beta`
  - Crear `auth.ts` en la raíz con `NextAuth({ providers: [Credentials, GitHub] })`. El `PrismaAdapter` se conectará en Task 3; por ahora usar JWT strategy
  - Crear `app/api/auth/[...nextauth]/route.ts`
  - Crear nuevo `src/auth/contexts/SessionProvider.tsx` basado en `SessionProvider` de next-auth (cliente), reemplazando el de Supabase. Mantener la misma interfaz que expone `useSession` para no romper el resto del código
  - Adaptar `src/auth/hooks/useAuth.tsx`: reemplazar llamadas a `supabase.auth.signUp/signInWithPassword/signInWithOAuth` por `signIn/signOut` de next-auth
  - Crear `middleware.ts` para proteger rutas: redirige a `/auth` si no hay sesión, excepto `/board/1` (board guest)
  - Variables de entorno: `AUTH_SECRET`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`
  - Eliminar dependencia de `@supabase/supabase-js` de `SessionProvider` y `useAuth`; el resto de repositorios Supabase siguen funcionando por ahora
- Tests unitarios: mock de `signIn` de next-auth; verificar que `useAuth` llama al provider correcto según `isRegister`
- Tests e2e: login con GitHub redirige correctamente; login con credenciales funciona; logout funciona
- Demo: Flujo de autenticación completo funciona con Auth.js. El resto de la app (boards, tareas) sigue usando Supabase DB temporalmente.

---

**Task 3: Instalar Prisma + Prisma Postgres + schema completo**

- Objetivo: Configurar Prisma con Prisma Postgres y definir todas las tablas
- Implementación:
  - Instalar `prisma`, `@prisma/client`, `@prisma/extension-accelerate`, `@auth/prisma-adapter`
  - `npx prisma init`
  - Definir `prisma/schema.prisma` completo: todas las tablas descritas en Background
  - Conectar `PrismaAdapter` en `auth.ts` (reemplaza la JWT strategy provisional de Task 2)
  - Crear `src/lib/prisma.ts` con singleton + Accelerate extension
  - `npx prisma migrate dev --name init`
  - Crear `prisma/seed.ts`: inserta los dos `TagGroup` default (Eisenhower, Dev) que hoy son constantes en el cliente
  - Variable de entorno: `DATABASE_URL` (Prisma Postgres connection string)
- Tests: `npx prisma migrate status` sin pendientes; `npx prisma db seed` sin errores; login crea `User` + `Account` en la DB
- Demo: Schema en Prisma Postgres; Auth.js usa PrismaAdapter; login/registro persiste usuarios reales en la DB.

---

**Task 4: Server Actions — Boards (Dashboard)**

- Objetivo: Reemplazar `SupabaseDashboardRepository` y `SupabaseBoardRepository` por Server Actions
- Implementación:
  - Crear `src/actions/board.ts` con `'use server'`:
    - `getBoards()` — boards del usuario autenticado via `auth()`
    - `createBoard({ name })` — crea `Board` + 3 `Column` default + `Note` + `Reminder` + `Archive` en una transacción
    - `deleteBoard({ boardId })` — elimina board (cascade)
    - `getBoardById({ boardId })` — valida ownership, retorna `{ id, name }`
    - `updateBoardName({ boardId, name })` — valida ownership, actualiza nombre
  - Todas las actions validan sesión con `auth()` y ownership del board
  - Crear `src/modules/board/repository/nextjsBoardRepository.ts` implementando `BoardRepository`
  - Crear `src/modules/Dashboard/repository/nextjsDashboardRepository.ts` implementando `DashboardRepository`
  - Actualizar factories: agregar `NextjsBoardRepository` / `NextjsDashboardRepository` cuando hay sesión next-auth. `LocalStorage*Repository` se mantiene para guest
  - Eliminar `SupabaseBoardRepository` y `SupabaseDashboardRepository`
- Tests unitarios: mock de `prisma` con `vi.mock`; verificar que `createBoard` crea columnas default; verificar que `deleteBoard` valida ownership
- Tests e2e: crear board → aparece en dashboard; eliminar board → desaparece; renombrar → persiste tras recarga
- Demo: Dashboard completo funciona sobre Prisma Postgres para usuarios autenticados; localStorage para guests.

---

**Task 5: Server Actions — Columns y Tasks**

- Objetivo: Reemplazar `SupabaseTaskListsRepository` por Server Actions sobre tablas `Column` y `Task` normalizadas
- Implementación:
  - Crear `src/actions/tasks.ts` con `'use server'`:
    - `getTaskBoard({ boardId })` — retorna `Column[]` con `Task[]` ordenados por `createdAt`, transformado al shape `TaskBoard` existente del cliente
    - `saveTaskBoard({ boardId, taskBoard })` — sincronización completa: upsert de columns + tasks en transacción. Asigna `order` por índice en el array
    - `createTask({ columnId, descriptionText })` — inserta `Task`
    - `updateTask({ taskId, ...fields })` — actualiza `descriptionText`, `notesAndComments`, `tags`, `timelineHistory`
    - `deleteTask({ taskId })` — elimina tarea, valida ownership via board
    - `moveTask({ taskId, toColumnId })` — `UPDATE tasks SET column_id = ?`, sin lógica de arrays
    - `createColumn({ boardId, name })` — inserta `Column` con `order` al final
    - `deleteColumn({ columnId })` — elimina columna (cascade a tasks)
    - `updateColumnName({ columnId, name })` — actualiza nombre
  - Crear `src/modules/TaskBoard/repository/nextjsTaskListRepository.ts` implementando `TaskListInEachColumnRepository`
  - La transformación `TaskBoard` ↔ `Column[]+Task[]` ocurre en el repositorio, preservando el shape que espera el cliente
  - Actualizar factory en `src/modules/TaskBoard/repository/index.ts`
  - Eliminar `SupabaseTaskListsRepository`
  - Eliminar tests unitarios de `addTask`, `deleteTask`, `moveTask`, `deleteTaskList`, `moveThisTaskToThisColumn` y sus implementaciones de array
- Tests unitarios: mock de `prisma`; verificar `moveTask` actualiza `column_id`; verificar `createColumn` asigna `order` correcto; verificar `getTaskBoard` retorna shape `TaskBoard` correcto
- Tests e2e: crear tarea → persiste; mover tarea entre columnas → orden correcto; eliminar columna → tasks eliminadas; todos los specs e2e existentes pasan
- Demo: Tablero Kanban completo funciona sobre Prisma Postgres. Las tareas y columnas son registros normalizados en la DB.

---

**Task 6: Server Actions — Notes**

- Objetivo: Reemplazar `SupabaseNotesRepository` por Server Actions sobre tabla `Note`
- Implementación:
  - Crear `src/actions/notes.ts` con `'use server'`:
    - `getNotes({ boardId })` — retorna `Note.content`
    - `saveNotes({ boardId, notes })` — upsert en tabla `Note`
  - Crear `src/modules/notes/repository/nextjsNotesRepository.ts` implementando `NotesRepository`
  - Actualizar `notesRepositoryFactory.ts`
  - Eliminar `SupabaseNotesRepository`
- Tests unitarios: mock de `prisma`; verificar `saveNotes` hace upsert; verificar `getNotes` retorna string vacío si no existe registro
- Tests e2e: `task-notes.spec.ts` pasa sin cambios
- Demo: El editor de notas persiste en Prisma Postgres.

---

**Task 7: Server Actions — Tags**

- Objetivo: Reemplazar `SupabaseTagRepository` por Server Actions sobre tabla `TagGroup`
- Implementación:
  - Crear `src/actions/tags.ts` con `'use server'`:
    - `getActiveTagGroup({ boardId })` — retorna el `TagGroup` activo del board (`Board.activeTagGroupId` → `TagGroup`)
    - `setActiveTagGroup({ boardId, tagGroupId })` — actualiza `Board.activeTagGroupId`
    - `getAvailableTagGroups()` — retorna todos los `TagGroup` de la DB (los default seeded en Task 3 + cualquier custom futuro)
  - Crear `src/modules/TaskBoard/components/taskList/components/Tags/repository/nextjsTagRepository.ts`
  - Actualizar factory en `Tags/repository/index.ts`
  - Eliminar `SupabaseTagRepository`
- Tests unitarios: verificar `setActiveTagGroup` actualiza la FK correctamente; verificar `getAvailableTagGroups` retorna los grupos seeded
- Demo: El selector de grupos de tags funciona; el grupo activo persiste entre sesiones.

---

**Task 8: Server Actions — Reminders y UsageHistory**

- Objetivo: Reemplazar los repositorios Supabase de reminders y usage history
- Implementación:
  - Agregar a `src/actions/board.ts`:
    - `getReminders({ boardId })` / `saveReminders({ boardId, reminders })` — upsert en tabla `Reminder`
    - `getUsageHistory({ boardId })` / `saveUsageHistory({ boardId, history })` — actualiza `Board.usageHistory` (campo Json directo)
  - Crear `src/modules/TaskBoard/components/Reminder/repository/nextjsReminderRepository.ts`
  - Crear `src/modules/UsageHistory/repository/nextjsUsageHistoryRepository.ts`
  - Actualizar factories respectivos
  - Eliminar `SupabaseUsageHistoryRepository` y repo Supabase de reminders
- Tests unitarios: verificar `saveUsageHistory` actualiza el campo Json en Board; verificar `saveReminders` hace upsert en Reminder
- Demo: Los recordatorios persisten; la página `/time/:id` muestra el historial real desde Prisma Postgres.

---

**Task 9: Server Actions — Archive**

- Objetivo: Reemplazar `SupabaseArchivedTasksRepository` por Server Actions sobre tabla `Archive`
- Implementación:
  - Crear `src/actions/archive.ts` con `'use server'`:
    - `getArchive({ boardId })` / `saveArchive({ boardId, taskList })` — upsert en tabla `Archive`
    - `getArchivedNotes({ boardId })` / `saveArchivedNotes({ boardId, notes })` — actualiza `Archive.notes`
  - Crear `src/modules/TaskBoard/components/taskList/components/ArchivedTasks/repository/nextjsArchiveRepository.ts`
  - Actualizar factory en `ArchivedTasks/repository/index.ts`
  - Eliminar `SupabaseArchivedTasksRepository`
- Tests unitarios: verificar `saveArchive` hace upsert; verificar `getArchive` retorna array vacío si no existe registro
- Tests e2e: `task-archive.spec.ts` pasa sin cambios
- Demo: El flujo completo de archivo funciona: archivar tareas, ver `/archive/:id`, descargar como PDF.

---

**Task 10: Migrar todas las rutas a App Router**

- Objetivo: Reemplazar react-router-dom por el sistema de rutas de Next.js
- Implementación:
  - Crear las rutas en `app/`:
    - `app/board/[id]/page.tsx`, `app/archive/[id]/page.tsx`, `app/settings/[id]/page.tsx`
    - `app/settings/page.tsx`, `app/time/[id]/page.tsx`, `app/help/page.tsx`
    - `app/auth/[[...id]]/page.tsx`, `app/not-found.tsx`
  - Reemplazar en todos los componentes:
    - `<Link>` de react-router-dom → `next/link`
    - `useNavigate` → `useRouter` de `next/navigation`
    - `useParams` → `useParams` de `next/navigation`
    - `<Navigate>` → `redirect()` de `next/navigation`
    - `useLocation` → `usePathname` de `next/navigation`
  - Adaptar `useUpdateBoardId` para usar `usePathname` + `useParams` de next/navigation
  - Eliminar `src/Router.tsx` y desinstalar `react-router-dom`, `react-router`
- Tests e2e: todos los specs existentes pasan; navegación entre rutas funciona; deep links funcionan; botón back del browser funciona
- Demo: Navegación completa sin react-router-dom. Las URLs son idénticas a las actuales.

---

**Task 11: Limpieza final — eliminar Supabase**

- Objetivo: Remover todo rastro de Supabase y verificar integridad completa
- Implementación:
  - Desinstalar `@supabase/supabase-js`
  - Eliminar `src/lib/supabase.ts`
  - Verificar que no quedan referencias a Supabase en ningún archivo (`grep -r "supabase" src/`)
  - Limpiar tipos que dependan de `@supabase/supabase-js` (ej: `Session` de supabase → `Session` de next-auth en los pocos lugares que aún lo usen)
  - Actualizar `.env.example`: remover `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`; agregar `AUTH_SECRET`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`, `DATABASE_URL`
  - Actualizar `README.md` con instrucciones de setup
  - `npm run build`, `npm run test`, `npm run test:e2e` todos en verde
- Tests: build sin errores; `npm run test` verde (unitarios de dominio + nuevos de Server Actions); todos los e2e pasan
- Demo: App completamente funcional sin ninguna dependencia de Supabase. Stack final: Next.js 15 + Auth.js + Prisma Postgres.

---

**Task 12 (opcional): Script de migración de datos Supabase → Prisma Postgres**

- Objetivo: Migrar datos existentes de usuarios sin perderlos
- Implementación:
  - Crear `scripts/migrate-from-supabase.ts`
  - Leer todos los boards de Supabase con `task_list_in_each_column`, `board_accessories`, `archive`
  - Para cada board: crear `Board` + descomponer el JSON blob en registros `Column` + `Task` normalizados (asignando `order` por índice del array original)
  - Crear `Note`, `Reminder`, `Archive` correspondientes desde `board_accessories`
  - Los usuarios se re-crean al primer login via Auth.js (no se migran contraseñas)
  - Manejar duplicados con upsert; loguear errores por board
  - Documentar en `README.md` cómo ejecutarlo
- Demo: Un board migrado desde Supabase se ve idéntico en la nueva app con todos sus datos.

