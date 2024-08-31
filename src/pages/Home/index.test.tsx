import { render, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'

import { AppContext } from '../../context/AppContext/context'
import { getPodcastList } from '../../helpers/ItunesAPI'

import { AppContextProps } from '../../context/AppContext/types'
import { ReactElementWithChildrenTypes } from '../../types'
import { PocastCardTypes } from '../../components/PodcastCard/types'

import Home from '.'

vi.mock('../../helpers/ItunesAPI', () => ({
    getPodcastList: vi.fn(),
}))

vi.mock('../../components/PodcastList', () => ({
    default: vi.fn(() => <figure>Podcasts list</figure>),
}))

const mockAppContext = {
    loading: false,
    toggleLoading: vi.fn()
}

const MockAppProvider = ({ loading, toggleLoading, children }: AppContextProps & ReactElementWithChildrenTypes) => {
    return (
        <AppContext.Provider value={{ loading, toggleLoading }}>
            {children}
        </AppContext.Provider>
    )
}

const mockPodcasts: PocastCardTypes[] = [
    {
        id: '1',
        title: 'Podcast One',
        author: 'Author One',
        artwork: 'https://via.placeholder.com/150',
    }
]

const mockGetPodcastList = vi.mocked(getPodcastList)

describe('Home', () => {
    beforeEach(() => {
        mockGetPodcastList.mockResolvedValue(mockPodcasts)
    })

    it('renders correctly and matches snapshot', async () => {
        const { container, getByText } = render(
            <BrowserRouter>
                <MockAppProvider {...mockAppContext}>
                    <Home />
                </MockAppProvider>
            </BrowserRouter>
        )

        await waitFor(() => {
            expect(getByText(/Podcasts list/i)).toBeTruthy()
        })

        expect(container).toMatchSnapshot()
    })

    it('displays podcasts after fetch', async () => {
        const { getByText } = render(
            <BrowserRouter>
                <MockAppProvider {...mockAppContext}>
                    <Home />
                </MockAppProvider>
            </BrowserRouter>
        )

        await waitFor(() => {
            expect(getByText('Podcasts list')).toBeTruthy()
        })
    })

    it('displays "This app isnt working" when the API doesnt work', async () => {
        mockGetPodcastList.mockResolvedValueOnce(undefined)

        const { getByText } = render(
            <BrowserRouter>
                <MockAppProvider {...mockAppContext}>
                    <Home />
                </MockAppProvider>
            </BrowserRouter>
        )

        await waitFor(() => {
            expect(getByText(/The app isn't working/i)).toBeTruthy()
        })
    })
})
