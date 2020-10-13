const express = require('express')
const app = express()
const port = 3100

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index', {
    id: 'testID',
    firstName: "Testley",
    lastName: "Testington",
    email: "test@email.com"
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
