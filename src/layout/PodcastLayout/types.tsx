import { RSSResponse } from '../../helpers/RSSParser/types'
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

export interface PodcastItemsTypes extends PodcastAsideTypes {
    episodes: RSSResponse[] | false
}