import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import AppLayout from '.'

vi.mock('react-router-dom', () => ({
    ...vi.importActual,
    Outlet: () => <div data-testid="outlet">Outlet Component</div>,
}))

vi.mock('../NavigationHeader', () => ({
    default: () => <div>NavigationHeader</div>,
}))

describe('AppLayout', () => {
    it('renders correctly and matches snapshot', () => {
        const { container } = render(<AppLayout />)

        expect(container).toMatchSnapshot()
    })

    it('renders the NavigationHeader', () => {
        const { getByText } = render(<AppLayout />)

        expect(getByText('NavigationHeader')).toBeTruthy()
    })

    it('renders the Outlet component', () => {
        const { getByTestId } = render(<AppLayout />)

        expect(getByTestId('outlet')).toBeTruthy()
    })
})
