export interface Theme {
	id: string
	bg: string
	task: string
	column: string
	text: string
	taskText?: string
	columnText?: string
	reminder?: string
}

// Fallback de invitado: subconjunto del catálogo. El catálogo completo vive en
// la DB (seeded desde prisma/seed.ts) y lo consumen los usuarios logueados.
// `retro` y `prado oscuro` son los defaults FK.
export const themesList: readonly Theme[] = Object.freeze([
	{
		id: 'orange',
		bg: 'bg-orange-400',
		text: 'text-black',
		column: 'bg-orange-100',
		task: 'bg-orange-300',
		reminder: 'bg-orange-200',
	},
	{
		id: 'amber',
		bg: 'bg-[#FAC335]',
		text: 'text-black',
		column: 'bg-amber-100',
		task: 'bg-amber-300',
		reminder: 'bg-amber-200',
	},
	{
		id: 'lime',
		bg: 'bg-lime-400',
		text: 'text-black',
		column: 'bg-lime-100',
		task: 'bg-lime-300',
		reminder: 'bg-lime-200',
	},
	{
		id: 'green',
		bg: 'bg-green-400',
		text: 'text-black',
		column: 'bg-green-100',
		task: 'bg-green-300',
		reminder: 'bg-green-200',
	},
	{
		id: 'teal',
		bg: 'bg-teal-400',
		text: 'text-black',
		column: 'bg-teal-100',
		task: 'bg-teal-300',
		reminder: 'bg-teal-200',
	},
	{
		id: 'blue',
		bg: 'bg-blue-400',
		text: 'text-black',
		column: 'bg-blue-100',
		task: 'bg-blue-300',
		reminder: 'bg-blue-200',
	},
	{
		id: 'indigo',
		bg: 'bg-indigo-400',
		text: 'text-black',
		column: 'bg-indigo-100',
		task: 'bg-indigo-300',
		reminder: 'bg-indigo-200',
	},
	{
		id: 'violet',
		bg: 'bg-violet-400',
		text: 'text-black',
		column: 'bg-violet-100',
		task: 'bg-violet-300',
		reminder: 'bg-violet-200',
	},
	{
		id: 'fuchsia',
		bg: 'bg-fuchsia-400',
		text: 'text-black',
		column: 'bg-fuchsia-100',
		task: 'bg-fuchsia-300',
		reminder: 'bg-fuchsia-200',
	},
	{
		id: 'rose',
		bg: 'bg-rose-400',
		text: 'text-black',
		column: 'bg-rose-100',
		task: 'bg-rose-300',
		reminder: 'bg-rose-200',
	},
	{
		id: 'slate',
		bg: 'bg-slate-400',
		text: 'text-black',
		column: 'bg-slate-100',
		task: 'bg-stone-300',
		reminder: 'bg-slate-200',
	},
	{
		id: 'stone',
		bg: 'bg-stone-400',
		text: 'text-black',
		column: 'bg-stone-100',
		task: 'bg-slate-300',
		reminder: 'bg-stone-200',
	},
	{
		id: 'stone-red-accent',
		bg: 'bg-stone-400',
		text: 'text-black',
		column: 'bg-stone-100',
		task: 'bg-red-300',
		reminder: 'bg-stone-200',
	},
	{
		id: 'BMO',
		bg: 'bg-[#317B71]',
		text: 'text-black',
		column: 'bg-[#ECFDEDC9]',
		task: 'bg-[#FDEF63]',
		reminder: 'bg-[#FDEF63]',
	},
	{
		id: 'fen',
		bg: 'bg-[#AB214F]',
		text: 'text-black',
		column: 'bg-[#FFD7DC]',
		task: 'bg-[#FF8F9F]',
		reminder: 'bg-[#FF8F9F]',
	},
	{
		id: 'retro',
		bg: 'bg-[#DE6536]',
		text: 'text-black',
		column: 'bg-[#EFE8D2]',
		task: 'bg-[#F5B46C]',
		reminder: 'bg-[#F5B46C]',
	},
	{
		id: 'prado oscuro',
		bg: 'bg-[#001D21]',
		text: 'text-[#FAE9CF]',
		column: 'bg-[#DFE1CB]',
		task: 'bg-[#AEB17E]',
		taskText: 'text-black',
		columnText: 'text-[#001D21]',
	},
	{
		id: 'wolf',
		bg: 'bg-[#0C9B99]',
		text: 'text-white',
		column: 'bg-[#363f5b]',
		task: 'bg-[#EADCD9]',
		taskText: 'text-black',
		columnText: 'text-white',
		reminder: 'bg-[#E68B70]',
	},
	{
		id: 'grad-blink-1',
		bg: 'bg-gradient-to-b from-[#3d1a14] via-[#c84a1d] to-[#e8a87c]',
		text: 'text-[#FAE9CF]',
		column: 'bg-[#F6D2AC]',
		columnText: 'text-black',
		task: 'bg-[#e35e49c2]',
	},
	{
		id: 'grad-blink-4',
		bg: 'bg-gradient-to-b from-[#FA9009] via-[#95122A] to-[#150B09]',
		text: 'text-[#020817ff]',
		column: 'bg-[#020817ff]',
		columnText: 'text-[#FAE9CF]',
		task: 'bg-[#CD6242]',
	},
])

export const lightTheme: Theme = { ...themesList.filter((theme) => theme.id == 'retro')[0] }

export const darkTheme: Theme = { ...themesList.filter((theme) => theme.id == 'prado oscuro')[0] }
