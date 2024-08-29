import { useParams } from 'react-router-dom'

import PodcastLayout from '../../layout/PodcastLayout'

const Episode = () => {
    const { podcastId, episodeId } = useParams()

    const asideProps = {
        name: `Podcast ${podcastId}`
    }

    return <>
        <PodcastLayout aside={asideProps}>
            <h1>Episode {episodeId}</h1>
            <p>Episode content</p>
        </PodcastLayout>
    </>
}

export default Episode