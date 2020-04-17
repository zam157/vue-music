const express = require('express')
const config = require('./config/index')
const apiRoutes = require('./build/routes')

const app = express()

app.use('/api', apiRoutes)

app.use(express.static('./dist'))

const port = process.env.PORT || config.build.port

module.exports = app.listen(port, err => {
  if (err) {
    console.log(err)
    return
  }
  console.log(`Listening at http://localhost:${port}\n`)
})
