export const millisecondsToHMS = (millis: number): string => {
    const hours = Math.floor(millis / 3600000)
    let minutes = Math.floor((millis % 3600000) / 60000)
    let seconds = Math.floor((millis % 60000) / 1000)
    const remainderMillis = millis % 1000

    if (remainderMillis >= 500) {
        seconds += 1
    }

    if (seconds === 60) {
        seconds = 0
        minutes += 1
    }

    if (minutes === 60) {
        minutes = 59
        seconds = 59
    }

    return (
        hours +
        ':' +
        (minutes < 10 ? '0' : '') + minutes +
        ':' +
        (seconds < 10 ? '0' : '') + seconds
    )
}