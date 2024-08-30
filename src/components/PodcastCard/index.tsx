import { Link } from 'react-router-dom'

import { PocastCardTypes } from './types'

const PodcastCard = ({ id, title, author, artwork }: PocastCardTypes) => <>
    <Link to={`/podcast/${id}`} className='block shadow-xl px-2 py-4'>
        <img className='w-2/5 mx-auto rounded-full' src={artwork} alt={title} />
        <header className='px-6 py-4'>
            <h4 className='font-bold text-xl mb-2 text-center whitespace-nowrap text-ellipsis overflow-hidden'>{title}</h4>
            <h6 className='text-gray-700 text-base text-center whitespace-nowrap text-ellipsis overflow-hidden'>{author}</h6>
        </header>
    </Link>
</>

export default PodcastCard