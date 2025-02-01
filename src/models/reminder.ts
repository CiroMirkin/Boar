export interface Reminder {
    columnPosition: string
    text: string
}

export const blankReminder: Reminder = Object.freeze({
    columnPosition: "",
    text: ""
})
