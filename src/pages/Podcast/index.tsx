import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useApp } from '../../context/AppContext'

import { getPodcastInfo } from '../../helpers/ItunesAPI'

import PodcastLayout from '../../layout/PodcastLayout'
import EpisodeList from '../../components/EpisodeList'

import { PodcastAsideTypes, PodcastEpisode } from '../../layout/PodcastLayout/types'

const Podcast = () => {
    const { podcastId } = useParams()
    const { loading, toggleLoading } = useApp()
    const [aside, setAside] = useState<PodcastAsideTypes | false>(false)
    const [episodes, setEpisodes] = useState<PodcastEpisode[]>()

    useEffect(() => {
        const fetchPodcasts = async () => {
            const content = await getPodcastInfo(String(podcastId))

            if (!content) {
                setAside(false)
                toggleLoading(false)
                return
            }

            setAside({
                id: content.id,
                title: content.title,
                author: content.author,
                artwork: content.artwork,
                description: content.description,
            })

            setEpisodes(content.episodes)

            toggleLoading(false)
        }

        toggleLoading(true)
        fetchPodcasts().catch(err => console.error(err))
    }, [podcastId])

    if (loading) return

    if (aside === false) return <section className='bg-gray-50 border-2 border-gray-200 shadow-xl p-4' data-testid='error-message'>This podcast doesn&apos;t work :(</section>

    return <>
        <PodcastLayout aside={aside}>
            <EpisodeList podcastId={podcastId!} episodes={episodes!} />
        </PodcastLayout>
    </>
}

export default Podcast