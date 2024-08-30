import { Link } from 'react-router-dom'
import { Parser } from 'html-to-react'

import { PodcastLayoutTypes } from './types'

const PodcastLayout = ({ children, aside: { id, title, author, artwork, description } }: PodcastLayoutTypes) => <>
    <section className='grid grid-cols-7 gap-12'>
        <aside className='col-span-2'>
            <figure className='block shadow-xl p-4'>
                <img className='w-4/5 mx-auto rounded-full' src={artwork} alt={title} />
                <header className='p-4'>
                    <Link to={`/podcast/${id}`}>
                        <h4 className='font-bold text-xl mb-2'>{title}</h4>
                        <h6 className='text-gray-700 text-base'>{author}</h6>
                    </Link>
                </header>
                <blockquote className='text-sm'>
                    <h5 className='font-bold text-lg mb-2'>Description</h5>
                    {Parser().parse(description)}
                </blockquote>
            </figure>
        </aside>
        <article className='col-span-5'>
            {children}
        </article>
    </section>
</>

export default PodcastLayout