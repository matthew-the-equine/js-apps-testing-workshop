const checkExam = () => {
  const hour = (new Date()).getHours()

  if (hour > 8) {
    throw new Error('The exam is over!')
  }
}

const examCalculator = () => ({
  sum: (a, b) => {
    checkExam()
    return a + b
  },
})


// 👉 TODO: What's wrong with this test?
// How can you make it pass regardless of date and time?
// 💡 Note: does this help? https://github.com/facebook/jest/issues/2234
// 💡 Remember to unskip!
describe.skip('examCalculator', () => {
  it(`should sum when it's before 9:00`, () => {
    // given
    const a = 1
    const b = 3

    // when
    const sum = examCalculator().sum(a, b)

    // then
    expect(sum).toEqual(4)
  })

  it(`should throw error when it's after 9:00`, () => {
    // when
    const suming = () => examCalculator().sum(1, 1)

    // then
    expect(suming).toThrow('The exam is over!')
  })
})
