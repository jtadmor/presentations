const fs = require('fs')
const data = require('./data')

const arr = []

data.forEach(row => {
  ['date_started', 'date_ended', 'date_due'].forEach(key => {
    if (row[key]) {
      row[key] = row[key] * 1000
    }
  })
})

fs.writeFileSync('./data.json', JSON.stringify(data))