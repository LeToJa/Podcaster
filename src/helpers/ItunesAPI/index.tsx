import { getCache, setCache } from '../ManageCache'

import { millisecondsToHMS } from '..'

import { MAXIMUM_EPISODES_PODCAST } from '../../constants'

import { PocastCardTypes } from '../../components/PodcastCard/types'
import { PodcastEpisodeTypes, PodcastItemsTypes } from '../../layout/PodcastLayout/types'
import { DefaultResponseFetchTypes, FeedResponseTypes, PodcastResponseTypes } from './types'

export const getPodcastList = async (): Promise<PocastCardTypes[] | undefined> => {
    try {
        const podcastsListStored = getCache('PodcastList', 1)

        if (podcastsListStored !== false) {
            return podcastsListStored as PocastCardTypes[]
        }

        const podcastsList = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')

        if (!podcastsList.ok) {
            throw new Error('HTTP error! status: ' + podcastsList.status)
        }

        const data = await podcastsList.json() as FeedResponseTypes

        const podcastsListProcessed = data.feed.entry.map(item => ({
            id: item.id.attributes['im:id'],
            title: item['im:name'].label,
            author: item['im:artist'].label,
            artwork: item['im:image'][2].label,
        }))

        setCache('PodcastList', podcastsListProcessed)

        return podcastsListProcessed
    } catch (err) {
        console.error((err as Error).message)
    }
}

export const getPodcastInfo = async (podcastId: string): Promise<PodcastItemsTypes | undefined> => {
    try {
        const podcastStored = getCache('PodcastInfo_' + podcastId, .25)

        if (podcastStored !== false) {
            return podcastStored as PodcastItemsTypes
        }

        const podcast = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://itunes.apple.com/lookup?id=' + podcastId + '&country=US&media=podcast&entity=podcastEpisode'))

        if (!podcast.ok) {
            throw new Error('HTTP error! status: ' + podcast.status)
        }

        const podcastResponse = await podcast.json() as DefaultResponseFetchTypes
        const podcastContents = podcastResponse.contents

        if (podcastContents.includes('Service Unavailable')) {
            throw new Error('AllOrigins Unavailable')
        }

        const podcastParsed = (JSON.parse(podcastContents) as PodcastResponseTypes).results

        const podcastAuthor = podcastParsed[0]
        const podcastEpisodes: PodcastEpisodeTypes[] = [
            ...podcastParsed.slice(1, MAXIMUM_EPISODES_PODCAST).map(episode => ({
                title: episode.trackName ?? 'Missing',
                content: episode.description ?? 'Missing',
                date: episode.releaseDate!.substring(0, 10) || 'Missing',
                url: episode.episodeUrl ?? 'Missing',
                type: typeof episode.episodeContentType === 'undefined' ? 'Missing' : episode.episodeContentType + '/' + episode.episodeFileExtension,
                duration: typeof episode.trackTimeMillis === 'undefined' ? 'Missing' : millisecondsToHMS(episode.trackTimeMillis)
            }))
        ]

        const prossesedData = {
            id: podcastId,
            title: podcastAuthor.collectionName,
            author: podcastAuthor.artistName,
            artwork: podcastAuthor.artworkUrl100,
            description: podcastAuthor.primaryGenreName + ' - ' + podcastAuthor.trackName,
            episodes: podcastEpisodes
        }

        setCache('PodcastInfo_' + podcastId, prossesedData)

        return prossesedData as PodcastItemsTypes
    } catch (err) {
        console.error((err as Error).message)
    }
}