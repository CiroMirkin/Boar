import { format } from "@formkit/tempo"

type fullDate = string

export const getFullDate = (): fullDate => {
    const date = new Date()
    const time = format(date, { date: "full", time: "short" })
    return time
}