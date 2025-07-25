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
		id: 'BMO',
		bg: 'bg-[#317B71]',
		text: 'text-black',
		column: 'bg-[#FFFDED]',
		task: 'bg-[#FEF8BD]',
		reminder: 'bg-[#FEF8BD]',
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
	{
		id: 'dog',
		bg: 'bg-[#FF4DA2]',
		text: 'text-black',
		column: 'bg-[#FFE6D9]',
		task: 'bg-[#F1AE2B]',
		reminder: 'bg-[#F1AE2B]',
	},
	{
		id: 'frog',
		bg: 'bg-[#94AE89]',
		text: 'text-black',
		column: 'bg-[#FFFAEC]',
		task: 'bg-[#FFCF64]',
		reminder: 'bg-[#FFCF64]',
	},
	{
		id: 'sky-frog',
		bg: 'bg-[#B6D67B]',
		text: 'text-black',
		column: 'bg-[#FEF3E3]',
		task: 'bg-[#9ABFEF]',
		reminder: 'bg-[#9ABFEF]',
	},
	{
		id: 'soft-bear',
		bg: 'bg-[#A1634F]',
		text: 'text-black',
		column: 'bg-[#EDE3D9]',
		task: 'bg-[#A5AFA6]',
		reminder: 'bg-[#A5AFA6]',
	},
	{
		id: 'sofy',
		bg: 'bg-[#AAB8DB]',
		text: 'text-black',
		column: 'bg-[#FDECF1]',
		task: 'bg-[#F3AAB5]',
		reminder: 'bg-[#F3AAB5]',
	},
	{
		id: 'nipo',
		bg: 'bg-[#B3A677]',
		text: 'text-black',
		column: 'bg-[#F2E4B8]',
		task: 'bg-[#E73C0AE0]',
		reminder: 'bg-[#E73C0A]',
	},
	{
		id: 'green-yellow',
		bg: 'bg-[#F3B659]',
		text: 'text-black',
		column: 'bg-[#F2E4B8]',
		task: 'bg-[#18894ABB]',
		reminder: 'bg-[#18894ABB]',
	},
	{
		id: 'Artaud',
		bg: 'bg-gradient-to-tr from-[#eab308] via-[#15803d] to-[#166534] backdrop-blur-sm',
		text: 'text-black',
		column: 'bg-[#F2E4B8]',
		task: 'bg-[#18894ABB]',
		reminder: 'bg-[#18894ABB]',
	},
])

export const lightTheme: Theme = { ...themesList.filter(theme => theme.id == 'retro')[0] }

export const darkTheme: Theme = { ...themesList.filter(theme => theme.id == 'soft-bear')[0] }
