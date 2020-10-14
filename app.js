const express = require('express')
const app = express()
const port = 3100

var rp = require('request-promise');

app.set('view engine', 'pug')

async function createUser() {
  var id = "";
  var response = {};

  await rp('http://localhost:3000/id').then(function(idResponse) {
    id = JSON.parse(idResponse)["id"]
    var options = {
      method: 'POST',
      uri: 'http://localhost:3000/user',
      body: {
        id: id,
        firstName: "Sample",
        lastName: "McTestington",
        email: "sample@email.com"
      },
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      json: true
    };
    return rp(options)
  }).then(function(createResponse) {
    return rp(`http://localhost:3000/user?id=${id}`)
  }).then(function(getResponse) {
    response = JSON.parse(getResponse)
    return response
  });
  return response
};

app.get('/', async (req, res, next) => {
  var counter = 1;
  var needUser = true;
  var user = {};

  while (needUser) {
    try {
      var userResponse = await createUser();
      user = userResponse;
      needUser = false;
    } catch (error) {
      counter += 1;
    };
  }

  res.render('index', {
    id: user["id"],
    firstName: user["firstName"],
    lastName: user["lastName"],
    email: user["email"],
    counter: counter
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
