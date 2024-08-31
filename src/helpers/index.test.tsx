import { describe, it, expect } from 'vitest'

import { millisecondsToHMS } from '.'

describe('millisecondsToHMS', () => {
    it('converts milliseconds to HH:MM:SS format correctly and matches the snapshot', () => {
        const time1 = millisecondsToHMS(12345678)
        const time2 = millisecondsToHMS(3600000)
        const time3 = millisecondsToHMS(3723000)
        const time4 = millisecondsToHMS(3599999)
        const time5 = millisecondsToHMS(86399999)

        expect(time1).toMatchSnapshot()
        expect(time2).toMatchSnapshot()
        expect(time3).toMatchSnapshot()
        expect(time4).toMatchSnapshot()
        expect(time5).toMatchSnapshot()
    });

    it('should return "0:00:00" when the input is 0 milliseconds', () => {
        expect(millisecondsToHMS(0)).toBe('0:00:00')
    })

    it('should return "0:00:01" when the input is 1000 milliseconds', () => {
        expect(millisecondsToHMS(1000)).toBe('0:00:01')
    })

    it('should return "0:01:00" when the input is 60000 milliseconds', () => {
        expect(millisecondsToHMS(60000)).toBe('0:01:00')
    })

    it('should return "1:00:00" when the input is 3600000 milliseconds', () => {
        expect(millisecondsToHMS(3600000)).toBe('1:00:00')
    })

    it('should return "1:01:01" when the input is 3661000 milliseconds', () => {
        expect(millisecondsToHMS(3661000)).toBe('1:01:01')
    })

    it('should correctly format single-digit minutes and seconds', () => {
        expect(millisecondsToHMS(7261000)).toBe('2:01:01')
    })

    it('should correctly handle milliseconds that round up the seconds', () => {
        expect(millisecondsToHMS(7261500)).toBe('2:01:02')
    })

    it('should correctly handle edge cases just below full seconds', () => {
        expect(millisecondsToHMS(3599999)).toBe('0:59:59')
    })
})
