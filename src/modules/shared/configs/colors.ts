
export interface ColorTheme {
    id: string,
    bg: string,
    task: string
    column: string
    text: string,
}

export const colorThemeList: readonly ColorTheme[] = Object.freeze([
    { id: "blue", bg: 'bg-blue-300', text: 'text-black', column: 'bg-blue-50', task: 'bg-blue-100', },
    { id: "rose", bg: 'bg-rose-300', text: 'text-black', column: 'bg-rose-50', task: 'bg-rose-100', },
    { id: "teal", bg: 'bg-teal-300', text: 'text-black', column: 'bg-teal-50', task: 'bg-teal-100', },
    { id: "green", bg: 'bg-green-300', text: 'text-black', column: 'bg-green-50', task: 'bg-green-100', },
    { id: "orange", bg: 'bg-orange-300', text: 'text-black', column: 'bg-orange-50', task: 'bg-orange-100', },
    { id: "amber", bg: 'bg-amber-300', text: 'text-black', column: 'bg-amber-50', task: 'bg-amber-100', },
    { id: "fuchsia", bg: 'bg-fuchsia-300', text: 'text-black', column: 'bg-fuchsia-50', task: 'bg-fuchsia-100', },
    { id: "violet", bg: 'bg-violet-300', text: 'text-black', column: 'bg-violet-50', task: 'bg-violet-100', },
    { id: "neutral", bg: 'bg-neutral-300', text: 'text-black', column: 'bg-neutral-50', task: 'bg-neutral-100', },
])

export const defaultColorTheme: ColorTheme = {...colorThemeList[0]}
