import { useState } from 'react'

import PodcastCard from '../../components/PodcastCard'

import { PodcastListTypes } from './types'

const PodcastList = ({ podcasts }: PodcastListTypes) => {

    const [filter, setFilter] = useState<string>('')


    const filteredPodcasts = podcasts?.filter(podcasts =>
        podcasts.title.toLowerCase().includes(filter.toLowerCase()) ||
        podcasts.author.toLowerCase().includes(filter.toLowerCase())
    )

    return <>
        <form className='flex justify-end items-center gap-4 mb-6' data-testid='app-form'>
            <label className='px-1 bg-sky-600 text-white font-bold rounded-lg' data-testid='form-label'>
                {filteredPodcasts.length}
            </label>
            <input
                type='text'
                placeholder='Search podcasts'
                name='filter-podcasts'
                id='filter-podcasts'
                className='bg-gray-100 px-4 py-3 rounded shadow-md outline-sky-600'
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                data-testid='form-input'
            />
        </form>
        <section className='grid grid-cols-5 gap-4'>
            {
                filteredPodcasts.length ?
                    filteredPodcasts?.map((podcast, key) => <PodcastCard key={key} {...podcast} />) :
                    <section className='col-span-5 font-bold text-xl text-gray-700 text-center' data-testid='app-message'>No podcasts :(</section>
            }
        </section>
    </>
}

export default PodcastList