import { CachedItemTypes } from './types'

export const getCache = <T = unknown>(id: string, time: number): T | false => {
    const item = localStorage.getItem(id)
    const curDate = new Date()

    if (item !== null) {
        const parsedItem = JSON.parse(item) as CachedItemTypes<T>
        const cacheTime = parseInt(parsedItem.cached_at)

        if (cacheTime + time * 86400000 > curDate.getTime()) {
            return parsedItem.content
        }
    }

    return false
}

export const setCache = (id: string, data: unknown) => {
    const cur_date = new Date().getTime()

    localStorage.setItem(
        id,
        JSON.stringify({
            cached_at: cur_date,
            content: data,
        })
    )
}