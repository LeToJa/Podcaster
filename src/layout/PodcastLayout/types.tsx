import { ReactElementWithChildrenTypes } from '../../types'

export interface PodcastLayoutTypes extends ReactElementWithChildrenTypes {
    aside: PodcastAsideTypes
}

interface PodcastAsideTypes {
    name: string
}