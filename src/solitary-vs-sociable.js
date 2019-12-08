function stringToNumberConverter(someString) {
  return Number(someString)
}

function calculatorFactory({ stringToNumberConverter }) {
  return (number1, number2) => {
    return stringToNumberConverter(number1) + stringToNumberConverter(number2)
  }
}

function sociableCalculatorTest() {
  const calculator = calculatorFactory({ stringToNumberConverter })
  const actual = calculator('12', '18')
  const expected = 30

  if ((actual === expected)) {
    return console.log('Pass sociable')
  }

  console.error(`${actual} is not equal ${expected}`)
}

sociableCalculatorTest()

function solitaryCalculatorTest() {
  const fakeConverter = number => number === '12' ? 12 : 18
  const calculator = calculatorFactory({ stringToNumberConverter: fakeConverter })
  const actual = calculator('12', '18')
  const expected = 30

  if ((actual === expected)) {
    return console.log('Pass solitary')
  }

  console.error(`${actual} is not equal ${expected}`)
}

solitaryCalculatorTest()
