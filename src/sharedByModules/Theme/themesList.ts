export interface Theme {
	id: string
	bg: string
	task: string
	column: string
	text: string
	reminder: string
}

export const themesList: readonly Theme[] = Object.freeze([
	{
		id: 'orange',
		bg: 'bg-orange-300',
		text: 'text-black',
		column: 'bg-orange-50',
		task: 'bg-orange-100',
		reminder: 'bg-orange-200',
	},
	{
		id: 'amber',
		bg: 'bg-amber-300',
		text: 'text-black',
		column: 'bg-amber-50',
		task: 'bg-amber-100',
		reminder: 'bg-amber-200',
	},
	{
		id: 'lime',
		bg: 'bg-lime-300',
		text: 'text-black',
		column: 'bg-lime-50',
		task: 'bg-lime-100',
		reminder: 'bg-lime-200',
	},
	{
		id: 'green',
		bg: 'bg-green-300',
		text: 'text-black',
		column: 'bg-green-50',
		task: 'bg-green-100',
		reminder: 'bg-green-200',
	},
	{
		id: 'teal',
		bg: 'bg-teal-300',
		text: 'text-black',
		column: 'bg-teal-50',
		task: 'bg-teal-100',
		reminder: 'bg-teal-200',
	},
	{
		id: 'blue',
		bg: 'bg-blue-300',
		text: 'text-black',
		column: 'bg-blue-50',
		task: 'bg-blue-100',
		reminder: 'bg-blue-200',
	},
	{
		id: 'violet',
		bg: 'bg-violet-300',
		text: 'text-black',
		column: 'bg-violet-50',
		task: 'bg-violet-100',
		reminder: 'bg-violet-200',
	},
	{
		id: 'fuchsia',
		bg: 'bg-fuchsia-300',
		text: 'text-black',
		column: 'bg-fuchsia-50',
		task: 'bg-fuchsia-100',
		reminder: 'bg-fuchsia-200',
	},
	{
		id: 'rose',
		bg: 'bg-rose-300',
		text: 'text-black',
		column: 'bg-rose-50',
		task: 'bg-rose-100',
		reminder: 'bg-rose-200',
	},
	{
		id: 'slate',
		bg: 'bg-slate-400',
		text: 'text-black',
		column: 'bg-slate-100',
		task: 'bg-slate-200',
		reminder: 'bg-slate-200',
	},
	{
		id: 'stone',
		bg: 'bg-stone-400',
		text: 'text-black',
		column: 'bg-stone-100',
		task: 'bg-stone-200',
		reminder: 'bg-stone-200',
	},
	{
		id: 'slate-dark',
		bg: 'bg-slate-600',
		text: 'text-black',
		column: 'bg-slate-400',
		task: 'bg-slate-500',
		reminder: 'bg-slate-200',
	},
	{
		id: 'BMO',
		bg: 'bg-[#317B71]',
		text: 'text-black',
		column: 'bg-[#FEF8BD]',
		task: 'bg-[#FFFDED]',
		reminder: 'bg-[#FFFDED]',
	},
	{
		id: 'fen',
		bg: 'bg-[#911C43]',
		text: 'text-black',
		column: 'bg-[#FFD7DC]',
		task: 'bg-[#FEBEC7]',
		reminder: 'bg-[#FEBEC7]',
	},
	{
		id: 'macha',
		bg: 'bg-[#69B125]',
		text: 'text-black',
		column: 'bg-[#F2FFE0]',
		task: 'bg-[#A7DE73]',
		reminder: 'bg-[#FEBEC7]',
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
		id: 'soft',
		bg: 'bg-[#4D8BC7]',
		text: 'text-black',
		column: 'bg-[#FDEFDE]',
		task: 'bg-[#FFBEA8]',
		reminder: 'bg-[#FFBEA8]',
	},
	{
		id: 'purple',
		bg: 'bg-[#8159A7]',
		text: 'text-black',
		column: 'bg-[#FDE1FF]',
		task: 'bg-[#DB6BCC]',
		reminder: 'bg-[#DB6BCC]',
	},
])

export const lightTheme: Theme = { ...themesList[5] }

export const darkTheme: Theme = themesList[themesList.length-3]
