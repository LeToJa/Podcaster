import { useParams } from 'react-router-dom'

import PodcastLayout from '../../layout/PodcastLayout'
import EpisodeCard from '../../components/EpisodeCard'

const Podcast = () => {
    const { podcastId } = useParams()

    const asideProps = {
        name: `Podcast ${podcastId}`
    }

    return <>
        <PodcastLayout aside={asideProps}>
            <ul>
                <li>
                    <EpisodeCard podcastId={`${podcastId}`} episodeId='1' name='Episode 1' />
                </li>
                <li>
                    <EpisodeCard podcastId={`${podcastId}`} episodeId='2' name='Episode 2' />
                </li>
                <li>
                    <EpisodeCard podcastId={`${podcastId}`} episodeId='3' name='Episode 3' />
                </li>
            </ul>
        </PodcastLayout>
    </>
}

export default Podcast