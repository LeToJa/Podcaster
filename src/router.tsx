import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'

import AppLayout from './layout/AppLayout'
import Home from './pages/Home'
import Podcast from './pages/Podcast'
import Episode from './pages/Episode'

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