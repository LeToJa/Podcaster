import { useEffect, useState } from 'react'

import { useApp } from '../../context/AppContext'

import { getPodcastList } from '../../helpers/ItunesAPI'

import { PocastCardTypes } from '../../components/PodcastCard/types'
import PodcastList from '../../components/PodcastList'

const Home = () => {
    const { loading, toggleLoading } = useApp()

    const [podcasts, setPodcasts] = useState<PocastCardTypes[] | undefined>([])

    useEffect(() => {
        const fetchPodcasts = async () => {
            const content = await getPodcastList()

            setPodcasts(content)
            toggleLoading(false)
        }

        toggleLoading(true)
        fetchPodcasts().catch(err => console.error(err))
    }, [])

    if (loading) return

    if (podcasts === undefined) return <section className='bg-gray-50 border-2 border-gray-200 shadow-xl p-4' data-testid='error-message'>The app isn&apos;t working</section>

    return <PodcastList podcasts={podcasts} />
}

export default Home