import express, { Request } from 'express'
import 'dotenv/config'

interface ElevatorAPIParams {
  elevatorId: string
  floorId: string
}

const app = express()
const api = express.Router()

const elevators: { [index: string]: number[] } = { }

api.get('/', (req: Request<ElevatorAPIParams>, res) => {
  const { elevatorId } = req.params

  if (elevators[elevatorId] !== undefined) {
    res.send(elevators[elevatorId])
  } else {
    res.status(404).send({
      status: 'error',
      message: 'No elevator with that id.'
    })
  }
})

api.get('/next', (req: Request<ElevatorAPIParams>, res) => {
  const { elevatorId } = req.params

  if (elevators[elevatorId] !== undefined) {
    res.send(elevators[elevatorId][0])
  } else {
    res.status(404).send({
      status: 'error',
      message: 'No elevator with that id.'
    })
  }
})

api.route('/:floorId')
  .put((req: Request<ElevatorAPIParams>, res) => {
    const { elevatorId, floorId } = req.params

    if (elevators[elevatorId] !== undefined) {
      elevators[elevatorId].push(parseInt(floorId, 10))
    } else {
      // For our current purposes, since we don't know how many elevators there
      // will be, we'll avoid throwing an error for an unknown elevator ID and
      // instead assume this elevator was always there and add the floor to its
      // list of floors to visit.
      elevators[elevatorId] = [(parseInt(floorId, 10))]
    }

    res.send(elevators[elevatorId])
  })
  .delete((req: Request<ElevatorAPIParams>, res) => {
    const { elevatorId, floorId } = req.params

    if (elevators[elevatorId] !== undefined) {
      elevators[elevatorId] = elevators[elevatorId].filter(
        (id) => id === (parseInt(floorId, 10))
      )
      res.send(elevators[elevatorId])
    } else {
      res.status(404).send({
        status: 'error',
        message: 'No elevator with that id.'
      })
    }
  })

app.use('/api/v1/elevator/:elevatorId/floors', api)

const port = process.env.PORT
app.listen(port, () => {
  console.log(`App listening on ${port}.`)
})
