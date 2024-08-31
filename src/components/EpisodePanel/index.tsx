import { Parser } from 'html-to-react'

import AudioPlayer from '../../components/AudioPlayer'

import { RSSResponse } from '../../helpers/RSSParser/types'

const EpisodePanel = ({ title, content, enclosure: { url, type } }: RSSResponse) => <>
    <div className='shadow-xl p-4'>
        <blockquote className='text-sm'>
            <h2 className='font-bold text-3xl mb-4'>{title}</h2>
            {Parser().parse(content)}
        </blockquote>
        <figure className='flex justify-center mt-6'>
            <AudioPlayer url={url} type={type} />
        </figure>
    </div>
</>

export default EpisodePanel