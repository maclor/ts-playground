import { describe, test, expect } from '@jest/globals'
import { isPalindrome } from './functions'

describe('palindrome', () => {
    test('single character is always palindrome', () => {
        expect(isPalindrome('a')).toBeTruthy()
    })
})