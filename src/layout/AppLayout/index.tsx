import { Outlet, ScrollRestoration } from 'react-router-dom'

import { AppProvider } from '../../context/AppContext/context'

import NavigationHeader from '../NavigationHeader'

const AppLayout = () => <>
    <AppProvider>
        <ScrollRestoration />
        <main className='max-w-screen-xl mx-auto'>
            <NavigationHeader />
            <Outlet />
        </main>
    </AppProvider>
</>

export default AppLayout