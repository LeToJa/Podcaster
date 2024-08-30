import { RSSResponse } from '../../helpers/RSSParser/types'

export interface EpisodeListTypes {
    podcastId: string
    episodes: RSSResponse[] | false
}