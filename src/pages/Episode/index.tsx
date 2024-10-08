import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useApp } from '../../context/AppContext'

import { getPodcastInfo } from '../../helpers/ItunesAPI'

import PodcastLayout from '../../layout/PodcastLayout'
import EpisodePanel from '../../components/EpisodePanel'

import { PodcastAsideTypes, PodcastEpisodeTypes } from '../../layout/PodcastLayout/types'

const Episode = () => {
    const { podcastId, episodeId } = useParams()
    const { loading, toggleLoading } = useApp()
    const [aside, setAside] = useState<PodcastAsideTypes | false>(false)
    const [episode, setEpisode] = useState<PodcastEpisodeTypes | false>(false)

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

            setEpisode(content.episodes[episodeId as unknown as number])

            toggleLoading(false)
        }

        toggleLoading(true)
        fetchPodcasts().catch(err => console.error(err))
    }, [podcastId])

    if (loading) return

    if (!aside || !episode) return <section className='bg-gray-50 border-2 border-gray-200 shadow-xl p-4' data-testid='error-message'>This episode doesn&apos;t work</section>

    return <>
        <PodcastLayout aside={aside}>
            <EpisodePanel {...episode} />
        </PodcastLayout>
    </>
}

export default Episode