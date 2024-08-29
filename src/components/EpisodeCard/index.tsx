import { Link } from 'react-router-dom'

import { EpisodeCardTypes } from './types'

const EpisodeCard = ({ podcastId, episodeId, name }: EpisodeCardTypes) => <>
    <Link to={`/podcast/${podcastId}/episode/${episodeId}`}>
        {name}
    </Link>
</>

export default EpisodeCard