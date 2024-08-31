import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getCache, setCache } from '.'

import { CachedItem } from './types'

describe('ManageCache functions', () => {
    beforeEach(() => {
        localStorage.clear()
        vi.resetAllMocks()
    })

    describe('getCache', () => {
        it('should return cached data if it is within the valid time frame', () => {
            const id = 'test-item'
            const data = { key: 'value' }
            const cachedAt = new Date().getTime() - 5000

            localStorage.setItem(
                id,
                JSON.stringify({
                    cached_at: cachedAt,
                    content: data,
                })
            )

            const result = getCache<CachedItem<unknown>>(id, 1)

            expect(result).toEqual(data)
        })

        it('should return false if the cached data is outdated', () => {
            const id = 'test-item'
            const data = { key: 'value' }
            const cachedAt = new Date().getTime() - 2 * 86400000

            localStorage.setItem(
                id,
                JSON.stringify({
                    cached_at: cachedAt,
                    content: data,
                })
            )

            const result = getCache<CachedItem<unknown>>(id, 1)

            expect(result).toBe(false)
        })

        it('should return false if there is no cached data', () => {
            const id = 'test-item'
            const result = getCache(id, 1)

            expect(result).toBe(false)
        })
    })

    describe('setCache', () => {
        it('should store data correctly in localStorage using setCache', () => {
            const id = 'test-item'
            const data = { key: 'value' }

            setCache(id, data)

            const storedItem = localStorage.getItem(id)

            expect(storedItem).not.toBeNull()
        })

        it('should update existing cache with new data', () => {
            const id = 'test-item'
            const initialData = { key: 'initial' }
            const newData = { key: 'updated' }

            setCache(id, initialData)
            setCache(id, newData)

            const storedItem = localStorage.getItem(id)
            const parsedItem = JSON.parse(storedItem!) as CachedItem<unknown>

            expect(parsedItem.content).toEqual(newData)
        })
    })
})
