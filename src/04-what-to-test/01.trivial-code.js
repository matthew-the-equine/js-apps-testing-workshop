const seasonEmoji = season => ({
  'spring':'🍃',
  'summer': '🌻',
  'fall': '🍂',
  'winter': '☃️',
})[season]

const addEmoji = (name, emoji) => ({
  'spring':'🍃',
  'summer': '🌻',
  'fall': '🍂',
  'winter': '☃️',
  [name]: emoji,
})

const betterToUpperCase = string => string ? string.toUpperCase() : ''
