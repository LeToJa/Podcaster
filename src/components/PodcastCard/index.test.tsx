import { BrowserRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { PocastCardTypes } from './types'

import PodcastCard from '.'

const mockProps: PocastCardTypes = {
    id: '123',
    title: 'Sample Podcast',
    author: 'John Doe',
    artwork: 'https://via.placeholder.com/150'
}

describe('PodcastCard', () => {
    it('renders correctly and matches snapshot', () => {
        const { container } = render(
            <BrowserRouter>
                <PodcastCard {...mockProps} />
            </BrowserRouter>
        )

        expect(container).toMatchSnapshot()
    })

    it('renders the correct title and author', () => {
        const { getByText } = render(
            <BrowserRouter>
                <PodcastCard {...mockProps} />
            </BrowserRouter>
        )

        expect(getByText('Sample Podcast')).toBeTruthy()
        expect(getByText('John Doe')).toBeTruthy()
    })

    it('contains the correct link', () => {
        const { getByRole } = render(
            <BrowserRouter>
                <PodcastCard {...mockProps} />
            </BrowserRouter>
        )

        const link = getByRole('link')
        expect(link).toHaveProperty('href', 'http://localhost:3000/podcast/123')
    })

    it('renders the artwork with the correct src and alt attributes', () => {
        const { getByAltText } = render(
            <BrowserRouter>
                <PodcastCard {...mockProps} />
            </BrowserRouter>
        )

        const image = getByAltText('Sample Podcast')
        expect(image).toHaveProperty('src', 'https://via.placeholder.com/150')
    })
})
