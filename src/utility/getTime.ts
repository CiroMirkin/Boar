import { format } from "@formkit/tempo"

type fullDate = string

export const getFullDate = (): fullDate => {
    const date = new Date()
    const time = format(date, { date: "full", time: "short" }).split(',')
    const formatTime = `(${time[2].trim()}) ${time[0]}, ${time[1]}`
    return formatTime
}