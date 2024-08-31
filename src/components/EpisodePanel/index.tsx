import { Parser } from 'html-to-react'

import AudioPlayer from '../../components/AudioPlayer'

import { PodcastEpisode } from '../../layout/PodcastLayout/types'

const EpisodePanel = ({ title, content, url, type }: PodcastEpisode) => <>
    <div className='bg-gray-50 border-2 border-gray-200 shadow-xl p-4'>
        <blockquote className='text-sm' data-testid='episode-description'>
            <h2 className='font-bold text-3xl mb-4' data-testid='episode-title'>{title}</h2>
            {Parser().parse(content)}
        </blockquote>
        <figure className='flex justify-center mt-6'>
            <AudioPlayer url={url} type={type} />
        </figure>
    </div>
</>

export default EpisodePanel