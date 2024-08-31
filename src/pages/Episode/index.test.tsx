import { render, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter, Params } from 'react-router-dom'

import { AppContextProps } from '../../context/AppContext/types'
import { GenericObject, ReactElementWithChildrenTypes } from '../../types'
import { AppContext } from '../../context/AppContext/context'
import { getPodcastInfo } from '../../helpers/ItunesAPI'

import Episode from '.'

vi.mock('react-router-dom', async (importOriginal): Promise<unknown> => {
    const actual: GenericObject = await importOriginal()

    return {
        ...actual,
        useParams: (): Readonly<Params<string>> => ({ podcastId: '123', episodeId: '0' }),
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

const mockPodcast = {
    id: '123',
    title: 'Sample Podcast',
    author: 'Author Name',
    artwork: 'some-url.jpg',
    description: 'Podcast Description',
    episodes: [
        {
            title: 'Episode 1',
            content: '<p>Episode content in HTML format</p>',
            isoDate: '2023-08-29T12:00:00Z',
            enclosure: {
                url: 'http://example.com/audio.mp3',
                type: 'audio/mpeg',
            },
            itunes: {
                duration: '30:00',
            }
        }
    ],
}

const mockGetPodcastInfo = vi.mocked(getPodcastInfo)

describe('Episode', () => {
    it('renders correctly and matches snapshot', async () => {
        mockGetPodcastInfo.mockResolvedValue(mockPodcast)

        const { container } = render(
            <BrowserRouter>
                <MockAppProvider {...mockAppContext}>
                    <Episode />
                </MockAppProvider>
            </BrowserRouter>
        )

        await waitFor(() => {
            expect(container).toMatchSnapshot()
        })
    })

    it('renders "This episode doesnt work" when there is no podcast data', async () => {
        mockGetPodcastInfo.mockResolvedValueOnce(false)

        const { getByText } = render(
            <BrowserRouter>
                <MockAppProvider {...mockAppContext}>
                    <Episode />
                </MockAppProvider>
            </BrowserRouter>
        )

        await waitFor(() => {
            expect(getByText(/This episode doesn't work/i)).toBeTruthy()
        })
    })

    it('renders "This episode doesnt work" when there is no episode data', async () => {
        mockGetPodcastInfo.mockResolvedValueOnce({
            ...mockPodcast,
            episodes: false,
        })

        const { getByText } = render(
            <BrowserRouter>
                <MockAppProvider {...mockAppContext}>
                    <Episode />
                </MockAppProvider>
            </BrowserRouter>
        )

        await waitFor(() => {
            expect(getByText(/This episode doesn't work/i)).toBeTruthy()
        })
    })

    it('renders podcast layout and episode panel when data is available', async () => {
        mockGetPodcastInfo.mockResolvedValue(mockPodcast)

        const { getByText } = render(
            <BrowserRouter>
                <MockAppProvider {...mockAppContext}>
                    <Episode />
                </MockAppProvider>
            </BrowserRouter>
        )

        await waitFor(() => {
            expect(getByText(/Episode 1/i)).toBeTruthy()
            expect(getByText(/Episode content in HTML format/i)).toBeTruthy()
        })
    })
})
