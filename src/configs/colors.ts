
export interface ColorTheme {
    bg: string,
    text: string,
}

export const defaultColorTheme: ColorTheme = {
    bg: 'bg-blue-200', 
    text: 'text-black',
}

export const bg_light_colors_list: readonly ColorTheme[] = Object.freeze([
    { bg: 'bg-blue-200', text: 'text-black' },
    { bg: 'bg-blue-300', text: 'text-black' },
    { bg: 'bg-rose-200', text: 'text-black' },
    { bg: 'bg-rose-300', text: 'text-black' },
    { bg: 'bg-teal-200', text: 'text-black' },
    { bg: 'bg-teal-300', text: 'text-black' },
    { bg: 'bg-green-200', text: 'text-black' },
    { bg: 'bg-green-300', text: 'text-black' },
    { bg: 'bg-orange-200', text: 'text-black' },
    { bg: 'bg-orange-300', text: 'text-black' },
    { bg: 'bg-amber-200', text: 'text-black' },
    { bg: 'bg-amber-300', text: 'text-black' },
    { bg: 'bg-fuchsia-200', text: 'text-black' },
    { bg: 'bg-fuchsia-300', text: 'text-black' },
    { bg: 'bg-violet-200', text: 'text-black' },
    { bg: 'bg-violet-300', text: 'text-black' },
    { bg: 'bg-neutral-300', text: 'text-black' },
])

export const bg_dark_colors_list: readonly ColorTheme[] = Object.freeze([
    { bg: 'bg-blue-900', text: 'text-white' },
    { bg: 'bg-blue-600', text: 'text-black' },
    { bg: 'bg-rose-900', text: 'text-white' },
    { bg: 'bg-rose-600', text: 'text-white' },
    { bg: 'bg-teal-900', text: 'text-white' },
    { bg: 'bg-teal-600', text: 'text-white' },
    { bg: 'bg-green-900', text: 'text-white' },
    { bg: 'bg-green-600', text: 'text-black' },
    { bg: 'bg-orange-900', text: 'text-white' },
    { bg: 'bg-orange-600', text: 'text-black' },
    { bg: 'bg-amber-900', text: 'text-white' },
    { bg: 'bg-amber-600', text: 'text-black' },
    { bg: 'bg-fuchsia-900', text: 'text-white' },
    { bg: 'bg-fuchsia-600', text: 'text-white' },
    { bg: 'bg-violet-900', text: 'text-white' },
    { bg: 'bg-violet-600', text: 'text-white' },
    { bg: 'bg-neutral-600', text: 'text-white' },
])