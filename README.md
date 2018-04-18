# Room Reservation System
## Example Requests and Responses
### AVEquipment
`POST /avEquipment`
```json
{
  "name": "av1",
  "active": true
}
```
```json
{
    "_links": {
        "avEquipment": {
            "href": "http://localhost:8080/avEquipment/1"
        },
        "self": {
            "href": "http://localhost:8080/avEquipment/1"
        }
    },
    "active": true,
    "name": "av1"
}
```
`GET /avEquipment`
```json
{
    "_embedded": {
        "avEquipment": [
            {
                "_links": {
                    "avEquipment": {
                        "href": "http://localhost:8080/avEquipment/1"
                    },
                    "self": {
                        "href": "http://localhost:8080/avEquipment/1"
                    }
                },
                "active": true,
                "name": "av1"
            }
        ]
    },
    "_links": {
        "profile": {
            "href": "http://localhost:8080/profile/avEquipment"
        },
        "self": {
            "href": "http://localhost:8080/avEquipment"
        }
    }
}
```
### Users
`POST /users`

```json
{
  "username": "helloworld",
  "firstName": "hello",
  "lastName": "world",
  "email": "hello@world.com",
  "password": "hunter2",
  "type": "ADMIN"
}
```
```json
{
    "_links": {
        "self": {
            "href": "http://localhost:8080/users/2"
        },
        "user": {
            "href": "http://localhost:8080/users/2"
        }
    },
    "email": "hello@world.com",
    "firstName": "hello",
    "lastName": "world",
    "password": "hunter2",
    "type": "ADMIN",
    "username": "helloworld"
}
```
`GET /users`

``` json
{
    "_embedded": {
        "users": [
            {
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/users/2"
                    },
                    "user": {
                        "href": "http://localhost:8080/users/2"
                    }
                },
                "email": "hello@world.com",
                "firstName": "hello",
                "lastName": "world",
                "password": "hunter2",
                "type": "ADMIN",
                "username": "helloworld"
            }
        ]
    },
    "_links": {
        "profile": {
            "href": "http://localhost:8080/profile/users"
        },
        "self": {
            "href": "http://localhost:8080/users"
        }
    }
}
```
### Room
`POST /rooms`

``` json
{
  "buildingId": 1,
  "name": "room1",
  "occupancy": 10,
  "avEquipment": [
    "http://localhost:8080/avEquipment/1"
  ]
}
```

``` json
{
    "_links": {
        "avEquipment": {
            "href": "http://localhost:8080/rooms/3/avEquipment"
        },
        "room": {
            "href": "http://localhost:8080/rooms/3"
        },
        "self": {
            "href": "http://localhost:8080/rooms/3"
        }
    },
    "buildingId": 1,
    "name": "room1",
    "occupancy": 10
}
```
`GET /rooms/3`

``` json
{
    "_links": {
        "avEquipment": {
            "href": "http://localhost:8080/rooms/3/avEquipment"
        },
        "room": {
            "href": "http://localhost:8080/rooms/3"
        },
        "self": {
            "href": "http://localhost:8080/rooms/3"
        }
    },
    "buildingId": 1,
    "name": "room1",
    "occupancy": 10
}
```
`GET /rooms/3/avEquipment`

``` json
{
    "_embedded": {
        "avEquipment": [
            {
                "_links": {
                    "avEquipment": {
                        "href": "http://localhost:8080/avEquipment/1"
                    },
                    "self": {
                        "href": "http://localhost:8080/avEquipment/1"
                    }
                },
                "active": true,
                "name": "av1"
            }
        ]
    },
    "_links": {
        "self": {
            "href": "http://localhost:8080/rooms/3/avEquipment"
        }
    }
}
```
### Reservation
`POST /reservations`

``` json
{
  "title": "odos scrum",
  "user": "http://localhost:8080/users/1",
  "startTime": "2018-04-18T09:54:44.19",
  "endTime": "2018-04-18T10:54:44.192",
  "roomConfiguration": "MEETING"
}

```

``` json
{
    "_links": {
        "reservation": {
            "href": "http://localhost:8080/reservations/4"
        },
        "self": {
            "href": "http://localhost:8080/reservations/4"
        },
        "user": {
            "href": "http://localhost:8080/reservations/4/user"
        }
    },
    "endTime": "2018-04-18T10:54:44.192",
    "roomConfiguration": "MEETING",
    "startTime": "2018-04-18T09:54:44.19",
    "title": "odos scrum"
}
```
