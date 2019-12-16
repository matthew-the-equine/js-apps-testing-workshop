class ExamCalculator {
  constructor(dateProvider) {
    this._dateProvider = dateProvider
  }
  _checkExam = () => {
    const hour = this._dateProvider().getHours()

    if (hour > 8) {
      throw new Error('The exam is over!')
    }
  }

  sum = (a, b) => {
    this._checkExam()
    return a + b
  }
}

// 💡 Remember to unskip!
describe.skip('ExamCalculator tested... badly', () => {
  it.only(`should not throw when it's before 9:00`, () => {
    // given
    const date = new Date()
    date.setHours(6)
    const dateProvider = () => date

    // when
    const checkingExam = () => (new ExamCalculator(dateProvider))._checkExam()

    // then
    expect(checkingExam).not.toThrow()
  })

  it(`should call _checkExam and don't throw and then sum two numbers`, () => {
    // given
    const date = new Date()
    date.setHours(6)
    const dateProvider = () => date
    const examCalculator = new ExamCalculator(dateProvider)
    jest.spyOn(examCalculator, '_checkExam')

    // when
    const sum = examCalculator.sum(1, 2)

    // then
    expect(sum).toEqual(3)
    expect(examCalculator._checkExam).toHaveBeenCalled()
  })
})

// 💡 Remember to unskip!
describe.skip(`ExamCalculator tested... well, better at least`, () => {
  it.only(`should sum when it's before 9:00`, () => {
    // given
    const a = 1
    const b = 3
    const date = new Date()
    date.setHours(6)
    const dateProvider = () => date

    // when
    const sum = (new ExamCalculator(dateProvider)).sum(a, b)

    // then
    expect(sum).toEqual(4)
  })
})
