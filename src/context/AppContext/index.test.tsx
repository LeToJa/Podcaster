import { fireEvent, render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { useApp } from '.'
import { AppProvider } from './context'

const TestComponent = () => {
    const { loading, toggleLoading } = useApp()

    return (
        <figure>
            <p>Loading: {loading.toString()}</p>
            <button onClick={() => toggleLoading(false)}>Toggle Loading</button>
        </figure>
    )
}

describe('AppContext', () => {
    it('provides the default context values', () => {
        const { getByText } = render(
            <AppProvider>
                <TestComponent />
            </AppProvider>
        )

        expect(getByText('Loading: true')).toBeTruthy()
    })

    it('toggles the loading state', () => {
        const { getByRole, getByText } = render(
            <AppProvider>
                <TestComponent />
            </AppProvider>
        )

        expect(getByText('Loading: true')).toBeTruthy()
        fireEvent.click(getByRole('button'))
        expect(getByText('Loading: false')).toBeTruthy()
    })

    it('throws an error when useApp is used outside of AppProvider', () => {
        const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(vi.fn())

        const TestComponentOutsideProvider = () => {
            useApp()
            return null
        }

        expect(() => render(<TestComponentOutsideProvider />)).toThrow('useApp must be used within a AppProvider')

        consoleErrorMock.mockRestore()
    })
})
