import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'

import { EpisodeCardTypes } from './types'

import EpisodeCard from '.'

const mockEpisode: EpisodeCardTypes = {
    podcastId: '123',
    episodeId: 456,
    title: 'Sample Episode',
    date: '2024-08-30',
    duration: '45:30'
}

describe('EpisodeCard', () => {
    it('renders correctly and matches snapshot', () => {
        const { container } = render(
            <BrowserRouter>
                <table>
                    <tbody>
                        <EpisodeCard {...mockEpisode} />
                    </tbody>
                </table>
            </BrowserRouter>
        )

        expect(container).toMatchSnapshot()
    })

    it('renders with correct content and link', () => {
        const { getByText } = render(
            <BrowserRouter>
                <table>
                    <tbody>
                        <EpisodeCard {...mockEpisode} />
                    </tbody>
                </table>
            </BrowserRouter>
        )

        const titleLink = getByText('Sample Episode')
        expect(titleLink).toBeTruthy()
        expect(titleLink.closest('a')).toHaveProperty('href', 'http://localhost:3000/podcast/123/episode/456')

        expect(getByText('2024-08-30')).toBeTruthy()
        expect(getByText('45:30')).toBeTruthy()
    })
})
