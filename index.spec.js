describe("function generatePassword", () => {

  it("should return a 12-character password if no arguments are passed", () => {

    const result = generatePassword()
    expect(result.length).toBe(12)

  })

  it("should return a password of the exact length if we pass a number between 8 and 20”", () => {

    let passwordLength = 15
    const result = generatePassword(passwordLength)
    expect(result.length).toBe(passwordLength)

  })

  it("should throw an error if the argument is not a number, or if it is less than 8 or greater than 20", () => {


    expect(() => generatePassword(5)).toThrow()
    expect(() => generatePassword("string")).toThrow()
    expect(() => generatePassword(21)).toThrow()

  })

  it("should contain at least one uppercase letter and one special character", () => {


    const result = generatePassword(12)
    expect(result).toMatch(/[A-Z]/)
    expect(result).toMatch(/[!@#$%^&*()_+={}|:;<>.?/-]/)
  })

})
