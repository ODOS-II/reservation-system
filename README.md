# Room Reservation System
## Technology Overview
### Backend API

The backend for the system is a Spring Boot app exposing a RESTful API for
managing room reservations. It makes use of the following technologies:

* [Spring Boot](https://projects.spring.io/spring-boot/)
* [Spring Data JPA](https://projects.spring.io/spring-data-jpa/)
* [Spring Data REST](https://projects.spring.io/spring-data-rest/)
* [Hypertext Application Language](https://tools.ietf.org/html/draft-kelly-json-hal-08)

### Frontend

The frontend is an Angular application which interacts with the backend through
the provided API.

## Getting Started
### Building

For portability, the application is distributed with a maven wrapper that allows
the user to build the application without having maven installed on the
system. To build a release jar, run the following command:

`./mvnw clean package`

This will generate an executable jar that can be run directly or deployed to a
servlet container.

### Running

There are two primary ways to run the application during development. The
preferred way is to use the following maven command:

`./mvnw spring-boot:run`

Alternatively, the jar built in the previous section can be executed directly:

`java -jar reservation-system-0.0.1-SNAPSHOT.jar`

Once the application loads successfully, the application will be available at
`http://localhost:8080/`

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
  "room": "http://localhost:8080/rooms/3",
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
        "room": {
            "href": "http://localhost:8080/reservations/4/room"
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
