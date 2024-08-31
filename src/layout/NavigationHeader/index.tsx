import { Link } from 'react-router-dom'

import { useApp } from '../../context/AppContext'

const NavigationHeader = () => {
    const { loading } = useApp()

    return <>
        <nav className='flex justify-between mb-10' data-testid='app-navbar'>
            <Link to='/' className='font-bold text-xl text-sky-600' data-testid='navbar-title'>Podcaster</Link>
            {!!loading && <figure className='animate-ping w-2 h-2 rounded-full bg-sky-600' data-testid='navbar-indicator'></figure>}
        </nav>
    </>
}

export default NavigationHeader