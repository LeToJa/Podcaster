import { Outlet } from 'react-router-dom'

import NavigationHeader from '../NavigationHeader'

const AppLayout = () => <>
    <main className='max-w-screen-xl mx-auto'>
        <NavigationHeader />
        <Outlet />
    </main>
</>

export default AppLayout