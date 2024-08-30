import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'

import { AppContext } from '../../context/AppContext/context'
import { getPodcastList } from '../../helpers/ItunesAPI'
import { AppContextProps } from '../../context/AppContext/types'
import { ReactElementWithChildrenTypes } from '../../types'

import Home from '.'

vi.mock('../../helpers/ItunesAPI', () => ({
    getPodcastList: vi.fn(),
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

const mockPodcasts = [
    {
        id: '1',
        title: 'Podcast One',
        author: 'Author One',
        artwork: 'https://via.placeholder.com/150',
    },
    {
        id: '2',
        title: 'Podcast Two',
        author: 'Author Two',
        artwork: 'https://via.placeholder.com/150',
    },
]

const mockGetPodcastList = vi.mocked(getPodcastList)

describe('Home', () => {
    beforeEach(() => {
        mockGetPodcastList.mockResolvedValue(mockPodcasts)
    })

    it('renders correctly and matches snapshot', () => {
        const { container } = render(
            <BrowserRouter>
                <MockAppProvider {...mockAppContext}>
                    <Home />
                </MockAppProvider>
            </BrowserRouter>
        )

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
            expect(getByText('Podcast One')).toBeTruthy()
            expect(getByText('Podcast Two')).toBeTruthy()
        })
    })

    it('filters podcasts based on user input', async () => {
        const { getByText, queryByText } = render(
            <BrowserRouter>
                <MockAppProvider {...mockAppContext}>
                    <Home />
                </MockAppProvider>
            </BrowserRouter>
        )

        await waitFor(() => {
            expect(getByText('Podcast One')).toBeTruthy()
            expect(getByText('Podcast Two')).toBeTruthy()
        })

        fireEvent.change(screen.getByPlaceholderText('Search podcasts'), {
            target: { value: 'One' },
        })

        expect(getByText('Podcast One')).toBeTruthy()
        expect(queryByText('Podcast Two')).toBeFalsy()
    })

    it('displays "No podcasts :(" when no podcasts match the filter', async () => {
        const { getByText, getByPlaceholderText } = render(
            <BrowserRouter>
                <MockAppProvider {...mockAppContext}>
                    <Home />
                </MockAppProvider>
            </BrowserRouter>
        )

        await waitFor(() => {
            expect(getByText('Podcast One')).toBeTruthy()
            expect(getByText('Podcast Two')).toBeTruthy()
        })

        fireEvent.change(getByPlaceholderText('Search podcasts'), {
            target: { value: 'Nonexistent Podcast' },
        })

        expect(getByText('No podcasts :(')).toBeTruthy()
    })

    it('displays "No podcasts :(" when the API returns no podcasts', async () => {
        mockGetPodcastList.mockResolvedValue([])

        const { getByText } = render(
            <BrowserRouter>
                <MockAppProvider {...mockAppContext}>
                    <Home />
                </MockAppProvider>
            </BrowserRouter>
        )

        await waitFor(() => {
            expect(getByText('No podcasts :(')).toBeTruthy()
        })
    })
})
