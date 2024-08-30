import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import AudioPlayer from '.'

const mockProps = {
    url: 'http://example.com/audio.mp3',
    type: 'audio/mpeg',
}

describe('AudioPlayer', () => {
    it('renders correctly and matches snapshot', () => {
        const { container } = render(<AudioPlayer {...mockProps} />)

        expect(container).toMatchSnapshot()
    })

    it('renders correctly with given props', () => {
        const { container, getByText } = render(<AudioPlayer {...mockProps} />)

        const sourceElement = container.querySelector('source')

        expect(container.querySelector('audio')).toBeTruthy()
        expect(sourceElement).toBeTruthy()
        expect(sourceElement).toHaveProperty('src', mockProps.url)
        expect(sourceElement).toHaveProperty('type', mockProps.type)
        expect(getByText(/Your browser does not support the audio element./i)).toBeTruthy()
    })
})
