import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'

import AppLayout from '../layout/AppLayout'
import Home from './Home'
import Podcast from './Podcast'
import Episode from './Episode'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path='/podcast/:podcastId' element={<Podcast />} />
            <Route path='/podcast/:podcastId/episode/:episodeId' element={<Episode />} />
        </Route>
    )
)

export default router