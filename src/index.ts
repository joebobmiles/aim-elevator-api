import express, { Request } from 'express'
import 'dotenv/config'

const app = express()
const api = express.Router()

api.get('/', (req, res) => {
  res.send([])
})

api.get('/next', (req, res) => {
  res.send(null)
})

api.route('/:floorId')
  .put((req, res) => {
    res.send(null)
  })
  .delete((req, res) => {
    res.send(null)
  })

app.use('/api/v1/elevator/:elevatorId/floors', api)

const port = process.env.PORT
app.listen(port, () => {
  console.log(`App listening on ${port}.`)
})