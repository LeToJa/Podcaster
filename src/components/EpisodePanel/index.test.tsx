import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { PodcastEpisodeTypes } from '../../layout/PodcastLayout/types'

import EpisodePanel from '.'

vi.mock('../../components/AudioPlayer', () => ({
    default: vi.fn(() => <figure>Audio Player Mock</figure>),
}))

vi.mock('html-to-react', () => ({
    Parser: () => ({
        parse: vi.fn((htmlContent: string) => <>{htmlContent}</>),
    }),
}))

const mockEpisode: PodcastEpisodeTypes = {
    title: 'Test Episode',
    content: '<p>Episode content in HTML format</p>',
    date: '2023-08-29T12:00:00Z',
    url: 'http://example.com/audio.mp3',
    type: 'audio/mpeg',
    duration: '30:00'
}

describe('EpisodePanel', () => {
    it('renders correctly and matches snapshot', () => {
        const { container } = render(<EpisodePanel {...mockEpisode} />)

        expect(container).toMatchSnapshot()
    })

    it('renders correctly with given episode data', () => {
        const { getByText } = render(<EpisodePanel {...mockEpisode} />)

        expect(getByText(/Test Episode/i)).toBeTruthy()
        expect(getByText(/Episode content in HTML format/i)).toBeTruthy()
        expect(getByText(/Audio Player Mock/i)).toBeTruthy()
    })
})
