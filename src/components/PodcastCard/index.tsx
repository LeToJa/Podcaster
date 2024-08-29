import { Link } from 'react-router-dom'

import { PocastCardTypes } from './types'

const PodcastCard = ({ id, name }: PocastCardTypes) => <>
    <Link to={`/podcast/${id}`}>
        {name}
    </Link>
</>

export default PodcastCard