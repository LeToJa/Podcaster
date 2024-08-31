import EpisodeCard from '../EpisodeCard'

import { EpisodeListTypes } from './types'

const EpisodeList = ({ podcastId, episodes }: EpisodeListTypes) => {
    return <>
        <figure className='bg-gray-50 border-2 border-gray-200 shadow-xl p-4 mb-6' data-testid='podcast-count'>
            <h4 className='text-xl'>{episodes.length} episodes</h4>
        </figure>
        <figure className='bg-gray-50 border-2 border-gray-200 shadow-xl p-4' data-testid='podcast-episodes'>
            <table className='w-full table-fixed'>
                <thead>
                    <tr>
                        <th colSpan={8}>Title</th>
                        <th>Date</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        episodes.length ?
                            episodes.map((episode, key) => <EpisodeCard key={key} podcastId={`${podcastId}`} episodeId={key} title={episode.title} date={episode.date} duration={episode.duration} />) :
                            <tr data-testid='app-message'>
                                <td colSpan={3}>No episodes :(</td>
                            </tr>
                    }
                </tbody>
            </table>
        </figure>
    </>
}

export default EpisodeList