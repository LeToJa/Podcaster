import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import { BrowserRouter } from 'react-router-dom'

import Home from '.'
import { getPodcastList } from '../../helpers/ItunesAPI'

vi.mock('../../helpers/ItunesAPI', () => ({
    getPodcastList: vi.fn(),
}))

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

describe('Home', () => {
    beforeEach(() => {
        (getPodcastList as Mock).mockResolvedValue(mockPodcasts)
    })

    it('renders correctly and matches snapshot', async () => {
        const { container } = render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        )

        await waitFor(() => expect(getPodcastList).toHaveBeenCalled())

        expect(container).toMatchSnapshot()
    })

    it('displays podcasts after fetch', async () => {
        const { getByText } = render(
            <BrowserRouter>
                <Home />
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
                <Home />
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
                <Home />
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
        (getPodcastList as Mock).mockResolvedValue([])

        const { getByText } = render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        )

        await waitFor(() => {
            expect(getByText('No podcasts :(')).toBeTruthy()
        })
    })
})
