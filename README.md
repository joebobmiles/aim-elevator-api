# Elevator API

## Initial thoughts

- An elevator can only be in two states:
  - Stopped at a floor
  - Moving between floors
- Each elevator has a queue of floors to visit:
  - The next floor an elevator stops at is the closest floor in the direction
    it was previously traveling.
    - There are edge cases to this, such as reaching the top floor and being
      only able to go down.
      - What happens if a user gives a floor number that does not exist?
  - The list of floors an elevator is scheduled to stop at can be in any order.
    - The best ways to order the floors is either in numerical order or in the
      order the elevator will visit them.
  - A user can select one or more floors for an elevator to visit, at any time.

## Endpoints

### GET `/api/v1/elevator/{elevatorId}/floor`

Returns the floor that an elevator is on.

### GET `/api/v1/elevator/{elevatorId}/floor/next`

Returns the floor that an elevator will visit next.

### GET `/api/v1/elevator/{elevatorId}/floors`

Returns all the floors that the elevator needs to visit.

### POST `/api/v1/elevator/{elevatorId}/floors`

Adds one or more floors to an elevator's queue of floors to visit.

### POST `/api/v1/call/{floorId}`

Request (call) an elevator to a particular floor.