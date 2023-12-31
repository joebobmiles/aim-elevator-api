[![wakatime](https://wakatime.com/badge/user/fae05115-5e70-4df1-90c0-1a981cbdf216/project/d82e36c1-a1ca-4b9c-bd9d-38a0ad612d55.svg)](https://wakatime.com/badge/user/fae05115-5e70-4df1-90c0-1a981cbdf216/project/d82e36c1-a1ca-4b9c-bd9d-38a0ad612d55)

# Elevator API 

## Running The App

### For Development

If you have Docker and Docker Compose installed:
```
$ docker-compose up
```

If you only have Node installed:
```
$ export PORT=8080; npm run dev
```

### For Production

Docker and docker-compose are required for deployment:
```
$ docker-compose up --build
```

## Endpoints

### GET `/api/v1/elevator/{elevatorId}/floors`

Returns all the floors that the elevator needs to visit.

#### Response Body

```json
[ 1, 2, 3, ... ]
```

The list of all the floors an elevator has to visit, listed in the order that
they will be visited. If an error occurs, will return a status code other than
`200 OK` and the client will receive an error object:

```json
{
  "status": "error",
  "message": "A descriptive error message."
}
```

### GET `/api/v1/elevator/{elevatorId}/floors/next`

Returns the floor that an elevator will visit next.

#### Response Body

```json
1
```

A number identifying the floor to be visited next. If there is no next floor,
then the result will be null. If an error occurs, will return a status code
other than `200 OK` and the client will receive an error object:

```json
{
  "status": "error",
  "message": "A descriptive error message."
}
```

### PUT `/api/v1/elevator/{elevatorId}/floors/{floorId}`

Adds the floor to the elevator's queue of floors to visit.

#### Response Body

```json
[ 1, 2, 3, ... ]
```

Returns the new list of floors the elevator will visit. A `200 OK` status will
indicate if the floor was successfully added. If an error occurs, will return a
status code other than `200 OK` and the client will receive an error object:

```json
{
  "status": "error",
  "message": "A descriptive error message."
}
```

### DELETE `/api/vi/elevator/{elevatorId}/floors/{floorId}`

Removes the floor from the elevator's queue of floors to visit.

#### Response Body

```json
[ 1, 2, 3, ... ]
```

Returns the new list of floors the elevator will visit. A `200 OK` status will
indicate if the floor was successfully removed. If an error occurs, will return
a status code other than `200 OK` and the client will receive an error object:

```json
{
  "status": "error",
  "message": "A descriptive error message."
}
```

## Rationale

I chose this particular API design due to it being easy to understand what each
route did when combining it with an HTTP verb. For instance, `GET /ap1/v1/elevator/{elevatorId}/floors`
reads exactly how you'd describe it: "get elevator X's floors." As for the `PUT`
and `DELETE` routes, I could have relied on the body of the request to receive
the floor to add or delete from the elevator's list of floors to visit. However,
this didn't have the same semantics - `DELETE /ap1/v1/elevator/{elevatorId}/floors`
would lead you to believe that you were deleting the _entire_ floor list.

Additionally, I originally had planned for the `PUT` and `DELETE` routes to not
return anything in the response body on a successful operation. But I
realized that this would result in a doubling of requests. If you added a floor,
the next thing you naturally want to do is to get the recent list of floors. To
overcome this, I chose to instead return the newly modified list of floors in
the response body.

---

## Thoughts

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
      - It would be ideal to return them in the visit order.
      - The queue of floors to visit is sorted based on "priority"
        - The priority for our queue is just a heuristic that determines which
          floor is closest to the floor ahead of it in the queue.
  - A user can select one or more floors for an elevator to visit, at any time
    during their ride.
  - A floor cannot be selected more than once, which means that not only are
    we looking at a priority queue, but also a set.
- We don't know how many floors nor how many elevators there are
  - Accept those as environment variables.
    - This might not work well for elevators...
      - May be better for elevators to declare themselves in or out of service
      - Not really a concern at the moment.