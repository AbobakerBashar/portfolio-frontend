# Dashboard — Project Management TODO

## 1. Data layer

- [x] `lib/projects.ts` — localStorage CRUD + seed from `data/index.ts` (`ProjectFormValues`, `DashboardProject`)
- [x] `hooks/use-projects.ts` — TanStack Query hooks (`useProjects`, `useProject`, `useAddProject`, `useUpdateProject`, `useDeleteProject`)

## 2. Dashboard shell

- [x] `components/dashboard/Sidebar.tsx` — dashboard sidebar + top chrome (client, responsive)
- [x] `app/dashboard/layout.tsx` — Next.js layout wrapping children with `Sidebar`
- [x] Remove obsolete `app/dashboard/layoute.tsx`

## 3. Dashboard components

- [x] `components/dashboard/ProjectCard.tsx` — reusable card with edit/delete
- [x] `components/dashboard/ProjectForm.tsx` — shared add/edit form (react-hook-form)

## 4. Dashboard pages

- [x] `app/dashboard/page.tsx` — Overview with stats + recent projects
- [x] `app/dashboard/projects/page.tsx` — All projects with search + filter + delete
- [x] `app/dashboard/projects/new/page.tsx` — Create project
- [x] `app/dashboard/projects/[id]/edit/page.tsx` — Edit project

## 5. Verify

- [x] `npm run lint` — pass for dashboard code (2 pre-existing errors in `hooks/use-on-screen.ts` / `hooks/use-typing.ts`, unrelated to dashboard; 1 warning in `ProjectForm.tsx` for React Compiler `watch()` compatibility)
- [x] `npm run build` — pass (Next.js compiled successfully)
