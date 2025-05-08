export const isTodayEvent = (date: Date | string) => {
    // Whether this event happens today
    const today = new Date();
    if (typeof date === 'string') {
        date = new Date(date);
    }
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
}