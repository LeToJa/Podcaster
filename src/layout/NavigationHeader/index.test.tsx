import { render } from '@testing-library/react'
import { describe, it, expect, vi, Mock } from 'vitest'
import { BrowserRouter } from 'react-router-dom'

import NavigationHeader from '.'
import { useApp } from '../../context/AppContext'

vi.mock('../../context/AppContext', () => ({
    useApp: vi.fn(),
}))

describe('NavigationHeader', () => {
    it('renders correctly and matches snapshot', () => {
        (useApp as Mock).mockReturnValue({ loading: false })

        const { container } = render(
            <BrowserRouter>
                <NavigationHeader />
            </BrowserRouter>
        )

        expect(container).toMatchSnapshot()
    })

    it('renders the Podcaster link', () => {
        (useApp as Mock).mockReturnValue({ loading: false })

        const { getByText } = render(
            <BrowserRouter>
                <NavigationHeader />
            </BrowserRouter>
        )

        const linkElement = getByText('Podcaster')

        expect(linkElement).toBeTruthy()
        expect(linkElement).toHaveProperty('href', 'http://localhost:3000/')
    })

    it('does not render the loading indicator when loading is false', () => {
        (useApp as Mock).mockReturnValue({ loading: false })

        const { queryByRole } = render(
            <BrowserRouter>
                <NavigationHeader />
            </BrowserRouter>
        )

        expect(queryByRole('figure')).toBeFalsy()
    })

    it('renders the loading indicator when loading is true', () => {
        (useApp as Mock).mockReturnValue({ loading: true })

        const { queryByRole } = render(
            <BrowserRouter>
                <NavigationHeader />
            </BrowserRouter>
        )

        expect(queryByRole('figure')).toBeTruthy()
    })
})
