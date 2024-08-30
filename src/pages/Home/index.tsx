import { useEffect, useState } from 'react'

import { getPodcastList } from '../../helpers/ItunesAPI'

import PodcastCard from '../../components/PodcastCard'
import { PocastCardTypes } from '../../components/PodcastCard/types'

const Home = () => {
    const [filter, setFilter] = useState<string>('')
    const [podcasts, setPodcasts] = useState<PocastCardTypes[] | undefined>([])

    useEffect(() => {
        const fetchPodcasts = async () => {
            const content = await getPodcastList()

            setPodcasts(content)
        }

        fetchPodcasts().catch(err => console.error(err))
    }, [])


    const filteredPodcasts = podcasts?.filter(podcasts =>
        podcasts.title.toLowerCase().includes(filter.toLowerCase()) ||
        podcasts.author.toLowerCase().includes(filter.toLowerCase())
    )

    return <>
        <form className='flex justify-center my-6'>
            <input
                type='text'
                placeholder='Search podcasts'
                name='filter-podcasts'
                id='filter-podcasts'
                className='bg-gray-100 px-4 py-3 rounded shadow-md'
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
        </form>
        <section className='grid grid-cols-5 gap-4'>
            {
                filteredPodcasts?.length ?
                    filteredPodcasts?.map((podcast, key) => <PodcastCard key={key} {...podcast} />) :
                    <div className='col-span-5 font-bold text-xl text-gray-700 text-center'>No podcasts :(</div>
            }
        </section>
    </>
}

export default Home