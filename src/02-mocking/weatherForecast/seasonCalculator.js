function getSeason(date) {
  const month = date.getMonth() + 1

  console.log(month)

  switch(month) {
    case 12:
    case 1:
    case 2:
      return 'winter'
    case 3:
    case 4:
    case 5:
      return 'spring'
    case 6:
    case 7:
    case 8:
      return 'summer'
    case 9:
    case 10:
    case 11:
      return 'fall'
    default:
      throw new Error(`Incorrect month`)
  }
}

export default getSeason
