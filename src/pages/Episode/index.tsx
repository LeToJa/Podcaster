import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useApp } from '../../context/AppContext'

import { getPodcastInfo } from '../../helpers/ItunesAPI'

import PodcastLayout from '../../layout/PodcastLayout'
import EpisodePanel from '../../components/EpisodePanel'

import { PodcastAsideTypes } from '../../layout/PodcastLayout/types'
import { RSSResponse } from '../../helpers/RSSParser/types'

const Episode = () => {
    const { podcastId, episodeId } = useParams()
    const { loading, toggleLoading } = useApp()
    const [aside, setAside] = useState<PodcastAsideTypes | false>(false)
    const [episode, setEpisode] = useState<RSSResponse | false>(false)

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

            if (!content.episodes || typeof episodeId === 'undefined') {
                toggleLoading(false)
                return
            }

            setEpisode(content.episodes[episodeId as unknown as number])

            toggleLoading(false)
        }

        toggleLoading(true)
        fetchPodcasts().catch(err => console.error(err))
    }, [podcastId])

    if (loading) return

    if (!aside || !episode) return <section className='shadow-xl p-4'>This episode doesn&apos;t work</section>

    return <>
        <PodcastLayout aside={aside}>
            <EpisodePanel {...episode} />
        </PodcastLayout>
    </>
}

export default Episode