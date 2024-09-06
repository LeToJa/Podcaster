import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { PodcastEpisodeTypes } from '../../layout/PodcastLayout/types'

import EpisodeList from '.'

vi.mock('../EpisodeCard', () => ({
    default: ({ title, date, duration }: { title: string, date: string, duration: string }) => (
        <tr>
            <td>{title}</td>
            <td>{date}</td>
            <td>{duration}</td>
        </tr>
    ),
}))

const mockEpisodes: PodcastEpisodeTypes[] = [
    {
        title: 'Episode 1',
        content: '<p>Episode content in HTML format</p>',
        date: '2023-08-29',
        url: 'http://example.com/audio.mp3',
        type: 'audio/mpeg',
        duration: '30:00'
    },
    {
        title: 'Episode 2',
        content: '<p>Episode content in HTML format</p>',
        date: '2023-08-28',
        url: 'http://example.com/audio.mp3',
        type: 'audio/mpeg',
        duration: '45:00'
    }
]

describe('EpisodeList', () => {
    it('renders correctly with episodes (snapshot)', () => {
        const { container } = render(<EpisodeList podcastId='123' episodes={mockEpisodes} />)

        expect(container).toMatchSnapshot()
    })

    it('renders correctly with no episodes (snapshot)', () => {
        const { container } = render(<EpisodeList podcastId='123' episodes={[]} />)

        expect(container).toMatchSnapshot()
    })

    it('displays the correct number of episodes', () => {
        const { getByText } = render(<EpisodeList podcastId='123' episodes={mockEpisodes} />)

        expect(getByText(/2 episodes/i)).toBeTruthy()
    })

    it('renders "No episodes" when the list is empty', () => {
        const { getByText } = render(<EpisodeList podcastId='123' episodes={[]} />)

        expect(getByText(/No episodes :\(/i)).toBeTruthy()
    })

    it('renders the episode details correctly', () => {
        const { getByText } = render(<EpisodeList podcastId='123' episodes={mockEpisodes} />)

        expect(getByText('Episode 1')).toBeTruthy()
        expect(getByText('2023-08-29')).toBeTruthy()
        expect(getByText('30:00')).toBeTruthy()
        expect(getByText('Episode 2')).toBeTruthy()
        expect(getByText('2023-08-28')).toBeTruthy()
        expect(getByText('45:00')).toBeTruthy()
    })
})
