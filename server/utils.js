export const getTime = () => {

    const currentDate = new Date()

    const hours = currentDate.getHours()
    const minutes = currentDate.getMinutes()

    /** Повертаємо поточний час */
    return `${hours}:${minutes}`
}