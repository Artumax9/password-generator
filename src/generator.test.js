import { describe, it, expect } from "vitest"
import { generatePasswords } from "./generator.js"

describe("generatePasswords", () => {
  it("returns a 12-character password if no arguments are passed", () => {
    const result = generatePasswords()
    expect(result.length).toBe(12)
  })

  it("returns a password of the exact length when given a valid length", () => {
    const passwordLength = 15
    const result = generatePasswords(passwordLength)
    expect(result.length).toBe(passwordLength)
  })

  it("throws an error if the length is not a number, or is out of the 8-20 range", () => {
    expect(() => generatePasswords(5)).toThrow()
    expect(() => generatePasswords("string")).toThrow()
    expect(() => generatePasswords(21)).toThrow()
  })

  // Regression test: an empty length input in the UI parses to NaN via
  // parseInt(""), and NaN slipped past the original validation because
  // both `NaN < 8` and `NaN > 20` evaluate to false.
  it("throws an error when the length is NaN", () => {
    expect(() => generatePasswords(NaN)).toThrow()
  })

  it("contains at least one uppercase letter and one special character", () => {
    const result = generatePasswords(12)
    expect(result).toMatch(/[A-Z]/)
    expect(result).toMatch(/[!@#$%^&*()_+={}|:;<>.?/-]/)
  })
})
