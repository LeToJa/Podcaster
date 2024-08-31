import { describe, it, expect, beforeEach, vi, Mock } from 'vitest'

import { getPodcastList, getPodcastInfo } from '.'
import { setCache, getCache } from '../ManageCache'

import { PocastCardTypes } from '../../components/PodcastCard/types'

vi.mock('../ManageCache', () => ({
    getCache: vi.fn(),
    setCache: vi.fn(),
}))

global.fetch = vi.fn()

const cachedPodcasts: PocastCardTypes[] = [{
    id: '1',
    title: 'Test Podcast',
    author: 'Test Author',
    artwork: 'test.jpg'
}]
const cachedPodcast = {
    contents: JSON.stringify({
        results: [
            {
                collectionName: 'Podcast Title',
                artistName: 'Podcast Author',
                artworkUrl100: 'artwork.jpg',
                primaryGenreName: 'Genre',
                trackName: 'Episode Title',
            },
            {
                trackName: 'Episode 1',
                description: 'Description 1',
                releaseDate: '2023-01-01',
                episodeUrl: 'http://example.com/episode1.mp3',
                episodeContentType: 'audio',
                episodeFileExtension: 'mp3',
                trackTimeMillis: 3600000,
            }
        ]
    })
}

describe('PodcastAPI Functions', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })

    describe('getPodcastList', () => {
        it('should return cached podcast list if available', async () => {
            (getCache as Mock).mockReturnValue(cachedPodcasts)

            const result = await getPodcastList()

            expect(getCache).toHaveBeenCalledWith('PodcastList', 1)
            expect(result).toEqual(cachedPodcasts)
        })

        it('should return undefined and log error if fetch fails', async () => {
            (getCache as Mock).mockReturnValue(false);
            (fetch as Mock).mockResolvedValue({
                ok: false,
                status: 500
            })

            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(vi.fn())
            const result = await getPodcastList()

            expect(result).toBeUndefined()
            expect(consoleSpy).toHaveBeenCalledWith('HTTP error! status: 500')

            consoleSpy.mockRestore()
        })



        it('should fetch and cache podcast info if not available in cache', async () => {
            (getCache as Mock).mockReturnValue(false);
            (fetch as Mock).mockResolvedValue({
                ok: true,
                json: () => cachedPodcast,
            })

            const result = await getPodcastInfo('1')

            expect(getCache).toHaveBeenCalledWith('PodcastInfo_1', 0.25)
            expect(fetch).toHaveBeenCalledWith(
                'https://api.allorigins.win/get?url=' + encodeURIComponent('https://itunes.apple.com/lookup?id=1&country=US&media=podcast&entity=podcastEpisode')
            )
            expect(setCache).toHaveBeenCalledWith('PodcastInfo_1', {
                id: '1',
                title: 'Podcast Title',
                author: 'Podcast Author',
                artwork: 'artwork.jpg',
                description: 'Genre - Episode Title',
                episodes: [
                    {
                        title: 'Episode 1',
                        content: 'Description 1',
                        date: '2023-01-01',
                        url: 'http://example.com/episode1.mp3',
                        type: 'audio/mp3',
                        duration: '1:00:00',
                    },
                ]
            })
            expect(result).toEqual({
                id: '1',
                title: 'Podcast Title',
                author: 'Podcast Author',
                artwork: 'artwork.jpg',
                description: 'Genre - Episode Title',
                episodes: [
                    {
                        title: 'Episode 1',
                        content: 'Description 1',
                        date: '2023-01-01',
                        url: 'http://example.com/episode1.mp3',
                        type: 'audio/mp3',
                        duration: '1:00:00',
                    },
                ]
            })
        })
    })

    describe('getPodcastInfo', () => {
        it('should return cached podcast info if available', async () => {
            (getCache as Mock).mockReturnValue(cachedPodcast)

            const result = await getPodcastInfo('1')

            expect(getCache).toHaveBeenCalledWith('PodcastInfo_1', .25)
            expect(result).toEqual(cachedPodcast)
        })

        it('should fetch and cache podcast info if not available in cache', async () => {
            (getCache as Mock).mockReturnValue(false);
            (fetch as Mock).mockResolvedValue({
                ok: true,
                json: () => cachedPodcast,
            })

            const result = await getPodcastInfo('1')

            expect(getCache).toHaveBeenCalledWith('PodcastInfo_1', .25)
            expect(fetch).toHaveBeenCalledWith(
                'https://api.allorigins.win/get?url=' + encodeURIComponent('https://itunes.apple.com/lookup?id=1&country=US&media=podcast&entity=podcastEpisode')
            )
            expect(setCache).toHaveBeenCalledWith('PodcastInfo_1', {
                id: '1',
                title: 'Podcast Title',
                author: 'Podcast Author',
                artwork: 'artwork.jpg',
                description: 'Genre - Episode Title',
                episodes: [
                    {
                        title: 'Episode 1',
                        content: 'Description 1',
                        date: '2023-01-01',
                        url: 'http://example.com/episode1.mp3',
                        type: 'audio/mp3',
                        duration: '1:00:00',
                    },
                ]
            })
            expect(result).toEqual({
                id: '1',
                title: 'Podcast Title',
                author: 'Podcast Author',
                artwork: 'artwork.jpg',
                description: 'Genre - Episode Title',
                episodes: [
                    {
                        title: 'Episode 1',
                        content: 'Description 1',
                        date: '2023-01-01',
                        url: 'http://example.com/episode1.mp3',
                        type: 'audio/mp3',
                        duration: '1:00:00',
                    },
                ]
            })
        })

        it('should return undefined and log error if fetch fails', async () => {
            (getCache as Mock).mockReturnValue(false);
            (fetch as Mock).mockResolvedValue({
                ok: false,
                status: 500,
            })

            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(vi.fn())
            const result = await getPodcastInfo('1')

            expect(result).toBeUndefined()
            expect(consoleSpy).toHaveBeenCalledWith('HTTP error! status: 500')

            consoleSpy.mockRestore()
        })

        it('should return undefined and log error if AllOrigins is unavailable', async () => {
            (getCache as Mock).mockReturnValue(false);
            (fetch as Mock).mockResolvedValue({
                ok: true,
                json: () => ({ contents: 'Service Unavailable' }),
            })

            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(vi.fn())
            const result = await getPodcastInfo('1')

            expect(result).toBeUndefined()
            expect(consoleSpy).toHaveBeenCalledWith('AllOrigins Unavailable')

            consoleSpy.mockRestore()
        })
    })
})
