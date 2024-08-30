import { getCache, setCache } from '../ManageCache'

import { PocastCardTypes } from '../../components/PodcastCard/types'
import { FeedResponseTypes } from './types'

export const getPodcastList = async (): Promise<PocastCardTypes[] | undefined> => {
    try {
        const podcasts = getCache('PodcastList', 1)

        if (podcasts !== false) {
            return podcasts as PocastCardTypes[]
        }

        const response = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json() as FeedResponseTypes
        const prossesedData = data.feed.entry.map(item => ({
            id: item.id.attributes['im:id'],
            title: item['im:name'].label,
            author: item['im:artist'].label,
            artwork: item['im:image'][2].label,
        }))

        setCache('PodcastList', prossesedData)

        return prossesedData
    } catch (err) {
        console.error((err as Error).message)
    }
}