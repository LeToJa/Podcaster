import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import PodcastLayout from '.'


const mockProps = {
    id: '123',
    title: 'Sample Podcast',
    author: 'John Doe',
    artwork: 'https://via.placeholder.com/150',
    description: '<p>This is a <strong>sample</strong> podcast description.</p>',
}

describe('PodcastLayout', () => {
    it('renders correctly and matches snapshot', () => {
        const { container } = render(
            <BrowserRouter>
                <PodcastLayout aside={mockProps}>
                    <figure>Podcast Episode List</figure>
                </PodcastLayout>
            </BrowserRouter>
        )

        expect(container).toMatchSnapshot()
    })

    it('renders with correct content and link', () => {
        const { getByAltText, getByText } = render(
            <BrowserRouter>
                <PodcastLayout aside={mockProps}>
                    <figure>Podcast Episode List</figure>
                </PodcastLayout>
            </BrowserRouter>
        )

        expect(getByAltText('Sample Podcast')).toBeTruthy()
        expect(getByText('Sample Podcast')).toBeTruthy()
        expect(getByText('John Doe')).toBeTruthy()
        expect(getByText('Sample Podcast').closest('a')).toHaveProperty('href', 'http://localhost:3000/podcast/123')
        expect(getByText('podcast description', { exact: false })).toBeTruthy()
        expect(getByText('Podcast Episode List')).toBeTruthy()
    })
})
