import express from 'express'
import 'dotenv/config'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

const port = process.env.PORT
app.listen(port, () => {
  console.log(`App listening on ${port}.`)
})