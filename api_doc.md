# games-app-server

Games App is an application to get information about games list, fun querntion, and good jokes. This app has : 
* REST endpoint 
* JSON formatted response

&nbsp;

## REST endpoints
### POST /register

> Create new User

_Request Header_
```
not needed
```

_Request Body_
```
required : 
- email = [string]
- password = [string]

{
  "email": "<email to get insert into>"
  "password": "<password to get insert into>"
}
```

_Response (201)_
```
{
    "id": 5,
    "email": "a@mail.com"
}
```

_Response (400 - Bad Request)_
```
{
    "msg": "Email telah digunakan"
}
```
---
### POST /login

> Create token for user

_Request Header_
```
not needed data
```

_Request Body_
```
required : 
- email = [string]
- password = [string]

{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (200 - Success)_
```
{
  "access_token": "<your access token>"
}
```

_Response (401 - Unauthorized)_
```
{
    "msg": "Invalid email or password"
}
```

---
### POST /googlelogin

> Create token for user

_Request Header_
```
not needed data
```

_Request Body_
```
required : 
- google account
```

_Response (200 - Success)_
```
{
  "access_token": "<your access token>"
}
```

_Response (500 - Internal server error)_
```
{
    "msg": "Internal server error"
}
```

---
### GET /jokesAPI 

> Get jokes data from jokes api

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "error": false,
    "category": "Pun",
    "type": "twopart",
    "setup": "What does a perverted frog say?",
    "delivery": "Rubbit.",
    "flags": {
        "nsfw": true,
        "religious": false,
        "political": false,
        "racist": false,
        "sexist": false
    },
    "id": 174,
    "lang": "en"
}
```

_Response (500 - Internal server error)_
```
{
    "msg": "Internal server error"
}
```
---
### POST /igdbAPI

> Fetch data about from internet games database api

_Request Header_
```
{
    "Client-ID": <your client id>,
    "Authorization": 'Bearer ' + <your client secret>
}
```

_Request Body_
```
{
 data: "fields name, url, release_dates.*, cover.*;"
}
```

_Response (200 - Success)_
```
[
    {
        "id": 70,
        "cover": {
            "id": 71,
            "game": 70,
            "height": 347,
            "image_id": "ndfzbf3xvuuchijx7v1c",
            "url": "//images.igdb.com/igdb/image/upload/t_thumb/ndfzbf3xvuuchijx7v1c.jpg",
            "width": 288,
            "checksum": "144656d4-5cfd-86a4-d785-89f7fcb8bb96"
        },
        .
        .
        .
    }
]
```

_Response (500 - Internal server error)_
```
{
    "msg": "Internal server error"
}
```

---
### GET /triviaAPI

> Fetch all data from trivia api

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "email": "<email to get insert into>"
  "password": "<password to get insert into>"
}
```

_Response (200)_
```
{
    "id": 5,
    "email": "a@mail.com"
}
```

_Response (400 - Bad Request)_
```
{
    "msg": "Email telah digunakan"
}
```
