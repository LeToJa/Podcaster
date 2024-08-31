import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'

import { AppContext } from '../../context/AppContext/context'
import { AppContextProps } from '../../context/AppContext/types'
import { ReactElementWithChildrenTypes } from '../../types'
import { PocastCardTypes } from '../PodcastCard/types'

import PodcastList from '.'

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
        artwork: 'https://via.placeholder.com/150'
    },
    {
        id: '2',
        title: 'Podcast Two',
        author: 'Author Two',
        artwork: 'https://via.placeholder.com/150'
    },
]

describe('Home', () => {
    it('renders correctly and matches snapshot', async () => {
        const { container, getByText } = render(
            <BrowserRouter>
                <MockAppProvider {...mockAppContext}>
                    <PodcastList podcasts={mockPodcasts} />
                </MockAppProvider>
            </BrowserRouter>
        )

        await waitFor(() => {
            expect(getByText(/Podcast One/i)).toBeTruthy()
        })

        expect(container).toMatchSnapshot()
    })

    it('displays podcasts', async () => {
        const { getByText } = render(
            <BrowserRouter>
                <MockAppProvider {...mockAppContext}>
                    <PodcastList podcasts={mockPodcasts} />
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
                    <PodcastList podcasts={mockPodcasts} />
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
                    <PodcastList podcasts={mockPodcasts} />
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
})
