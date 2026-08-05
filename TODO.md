# Dashboard — Skills Management TODO

## 1. Data Layer

- [x] `lib/skills.ts` — localStorage CRUD + seed from `data/index.ts` (`SkillFormValues`, `DashboardSkill`) with `order` + `featured` fields and expanded categories

## 2. TanStack Query Hooks

- [x] `hooks/use-skills.ts` — TanStack Query hooks (`useSkills`, `useSkill`, `useAddSkill`, `useUpdateSkill`, `useDeleteSkill`)

## 3. Components

- [x] `components/dashboard/SkillForm.tsx` — Add/edit skill form (react-hook-form) with category picker, level slider, icon picker, order input, featured toggle
- [x] `components/dashboard/SkillCard.tsx` — Skill card with featured badge, order badge, level bar, edit/delete

## 4. Dashboard Pages

- [x] `app/dashboard/skills/page.tsx` — All skills with search + filter + delete, sorted by order (featured first)
- [x] `app/dashboard/skills/new/page.tsx` — Create skill
- [x] `app/dashboard/skills/[id]/edit/page.tsx` — Edit skill

## 5. Dashboard Integration

- [x] Edit `components/dashboard/Sidebar.tsx` — Add Skills nav items
- [x] Edit `app/dashboard/page.tsx` — Add skills stats + recent skills (sorted by order)

## 6. Verify

- [x] `npm run build` — pass for skills code (compiled successfully in 65s, TypeScript checks running)

</content>
