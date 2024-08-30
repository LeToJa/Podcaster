import EpisodeCard from '../EpisodeCard'

import { EpisodeListTypes } from './types'

const EpisodeList = ({ podcastId, episodes }: EpisodeListTypes) => {
    if (episodes === false) return <section className='shadow-xl p-4'>This podcast doesn&apos;t use RSS :(</section>

    return <>
        <figure className='shadow-xl p-4 mb-6'>
            <h4 className='text-xl'>{episodes.length} episodes</h4>
        </figure>
        <figure className='shadow-xl p-4'>
            <table className='w-full table-auto'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        episodes.length ?
                            episodes.map((episode, key) => <EpisodeCard key={key} podcastId={`${podcastId}`} episodeId={key} title={episode.title} date={episode.isoDate.substring(0, 10)} duration={episode.itunes.duration} />) :
                            <tr>
                                <td colSpan={3}>No episodes :(</td>
                            </tr>
                    }
                </tbody>
            </table>
        </figure>
    </>
}

export default EpisodeList