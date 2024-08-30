import { getCache, setCache } from '../ManageCache'
import { parseURL } from '../RSSParser'

import { PocastCardTypes } from '../../components/PodcastCard/types'
import { PodcastItemsTypes } from '../../layout/PodcastLayout/types'
import { DefaultResponseFetch, FeedResponseTypes, PodcastResponseTypes } from './types'
import { MAXIMUM_EPISODES_PODCAST } from '../../constants'

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

export const getPodcastInfo = async (podcastId: string): Promise<PodcastItemsTypes | false> => {
    try {
        const podcast = getCache('PodcastInfo_' + podcastId, .25)

        if (podcast !== false) {
            return podcast as PodcastItemsTypes
        }

        const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://itunes.apple.com/lookup?id=' + podcastId))

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json() as DefaultResponseFetch

        const parsedPodcast = (JSON.parse(data.contents) as PodcastResponseTypes).results[0]
        const feed = await parseURL(parsedPodcast.feedUrl)

        const prossesedData = {
            id: podcastId,
            title: parsedPodcast.collectionName,
            author: parsedPodcast.artistName,
            artwork: parsedPodcast.artworkUrl100,
            description: typeof feed === 'undefined' ? parsedPodcast.trackName : feed.description,
            episodes: typeof feed === 'undefined' ? false : feed.items.slice(0, MAXIMUM_EPISODES_PODCAST)
        }

        setCache('PodcastInfo_' + podcastId, prossesedData)

        return prossesedData as PodcastItemsTypes
    } catch (err) {
        console.error((err as Error).message)

        return false
    }
}