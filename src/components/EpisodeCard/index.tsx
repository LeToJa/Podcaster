import { Link } from 'react-router-dom'

import { EpisodeCardTypes } from './types'

const EpisodeCard = ({ podcastId, episodeId, title, date, duration }: EpisodeCardTypes) => <>
    <tr data-testid='podcast-episode'>
        <td colSpan={8}>
            <Link to={`/podcast/${podcastId}/episode/${episodeId}`} className='font-bold text-sky-600'>
                {title}
            </Link>
        </td>
        <td className='text-center'>{date}</td>
        <td className='text-center'>{duration}</td>
    </tr>
</>

export default EpisodeCard