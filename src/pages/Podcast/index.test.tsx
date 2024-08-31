import { render, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserRouter, Params } from 'react-router-dom'

import { AppContext } from '../../context/AppContext/context'
import { getPodcastInfo } from '../../helpers/ItunesAPI'

import { AppContextProps } from '../../context/AppContext/types'
import { GenericObject, ReactElementWithChildrenTypes } from '../../types'
import { PodcastItemsTypes } from '../../layout/PodcastLayout/types'

import Podcast from '.'

vi.mock('react-router-dom', async (importOriginal): Promise<unknown> => {
    const actual: GenericObject = await importOriginal()

    return {
        ...actual,
        useParams: (): Readonly<Params<string>> => ({ podcastId: '123' }),
    }
})

vi.mock('../../helpers/ItunesAPI', () => ({
    getPodcastInfo: vi.fn(),
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

const mockPodcast: PodcastItemsTypes | false = {
    id: '123',
    title: 'Sample Podcast',
    author: 'Author Name',
    artwork: 'some-url.jpg',
    description: 'Podcast Description',
    episodes: [
        {
            title: 'Episode 1',
            content: '<p>Episode content in HTML format</p>',
            date: '2023-08-29T12:00:00Z',
            url: 'http://example.com/audio.mp3',
            type: 'audio/mpeg',
            duration: '30:00'
        }
    ]
}

const mockGetPodcastInfo = vi.mocked(getPodcastInfo)

describe('Podcast', () => {
    beforeEach(() => {
        mockGetPodcastInfo.mockResolvedValue(mockPodcast)
    })

    it('renders correctly and matches snapshot', async () => {
        const { container, getByText } = render(
            <BrowserRouter>
                <MockAppProvider {...mockAppContext}>
                    <Podcast />
                </MockAppProvider>
            </BrowserRouter>
        )

        await waitFor(() => {
            expect(getByText(/Sample Podcast/i)).toBeTruthy()
        })

        expect(container).toMatchSnapshot()
    })

    it('renders "This Podcast doesnt work" when there is no podcast data', async () => {
        mockGetPodcastInfo.mockResolvedValueOnce(undefined)

        const { getByText } = render(
            <BrowserRouter>
                <MockAppProvider {...mockAppContext}>
                    <Podcast />
                </MockAppProvider>
            </BrowserRouter>
        )

        await waitFor(() => {
            expect(getByText(/This Podcast doesn't work/i)).toBeTruthy()
        })
    })

    it('renders podcast layout and episode list when there is podcast data', async () => {
        const { getByText } = render(
            <BrowserRouter>
                <MockAppProvider {...mockAppContext}>
                    <Podcast />
                </MockAppProvider>
            </BrowserRouter>
        )

        await waitFor(() => {
            expect(getByText(/Sample Podcast/i)).toBeTruthy()
            expect(getByText(/Episode 1/i)).toBeTruthy()
        })
    })
})
