import { ReactElementWithChildrenTypes } from '../../types'

export interface PodcastLayoutTypes extends ReactElementWithChildrenTypes {
    aside: PodcastAsideTypes
}

export interface PodcastAsideTypes {
    id: string
    title: string
    author: string
    artwork: string
    description: string
}

export interface PodcastEpisodeTypes {
    title: string
    content: string
    date: string
    url: string
    type: string
    duration: string
}

export interface PodcastItemsTypes extends PodcastAsideTypes {
    episodes: PodcastEpisodeTypes[]
}