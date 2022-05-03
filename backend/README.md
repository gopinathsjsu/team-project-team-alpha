# BACKEND APIs

## 1. USER APIs
###  1. Register a user, POST - http://localhost:8080/v1/user/register
Request Body <br>
```yaml
{
"name": "Vivek Joshi",
"emailId": "abc@gmail.com",
"password": "pass"
} 
```
Response Body, STATUS-CODE - 201, 400 <br>
```yaml
{
  "id": 4,
  "name": "Vivek Joshi",
  "emailId": "abc@gmail.com",
  "password": "$2a$10$PyLcFggLIHpynW7neMvijOA6bxj4csbMk1vBsjuPZxXe7szgogqTu",
  "imageUrl": null,
  "rewardPoints": 0
}
```
###  2. Upload image for a user, POST - http://localhost:8080/v1/user/4/upload-image
Request Body- form-data, key: file
Response Body, STATUS-CODE - 200, 400(when user id not present) <br>
####NOTE - CHECK in S3, if images are getting uploaded, url "https://alpha-hotel-images.s3.us-east-2.amazonaws.com/1649557173059linkedin.jpeg"

```yaml
{
    "id": 4,
    "name": "Vivek Joshi",
    "emailId": "abc@gmail.com",
    "password": "$2a$10$PyLcFggLIHpynW7neMvijOA6bxj4csbMk1vBsjuPZxXe7szgogqTu",
    "imageUrl": "https://alpha-hotel-images.s3.us-east-2.amazonaws.com/course.png",
    "rewardPoints": 0
}
```
###  3. Get a user, GET - http://localhost:8080/v1/user/4
Response Body, STATUS-CODE - 200, 404 <br>
```yaml
{
  "id": 4,
  "name": "Vivek Joshi",
  "emailId": "abc@gmail.com",
  "password": "$2a$10$PyLcFggLIHpynW7neMvijOA6bxj4csbMk1vBsjuPZxXe7szgogqTu",
  "imageUrl": "https://alpha-hotel-images.s3.us-east-2.amazonaws.com/course.png",
  "rewardPoints": 0
}
```
### 4. Login a user, POST - http://localhost:8080/v1/user/login
Request Body <br>
```yaml
{
"emailId": "abc@gmail.com",
"password": "pass"
} 
```
Response Body, STATUS-CODE - 200, 401 <br>
```yaml
{
  "id": 4,
  "name": "Vivek Joshi",
  "emailId": "abc@gmail.com",
  "password": "$2a$10$PyLcFggLIHpynW7neMvijOA6bxj4csbMk1vBsjuPZxXe7szgogqTu",
  "imageUrl": "https://alpha-hotel-images.s3.us-east-2.amazonaws.com/course.png",
  "rewardPoints": 0
}
```

### 5. Update rewards of a user, PUT - http://localhost:8080/v1/user/4?rewards=55
Response Body, STATUS-CODE - 200, 400 <br>
```yaml
{
    "id": 4,
    "name": "Vivek Joshi",
    "emailId": "abc@gmail.com",
    "password": "$2a$10$PyLcFggLIHpynW7neMvijOA6bxj4csbMk1vBsjuPZxXe7szgogqTu",
    "imageUrl": "https://alpha-hotel-images.s3.us-east-2.amazonaws.com/course.png",
    "rewardPoints": 55
}
```

### 6. Delete a user, DELETE - http://localhost:8080/v1/user/4
Response Body, STATUS-CODE - 200, 404 <br>
User with id: 6 deleted successfully


### 7. Update a user, PUT - http://localhost:8080/v1/user/6/update
Request Body
```yaml
{
    "id": 6,
    "name": "Vivek Joshi",
    "emailId": "absc@gmail.com",
    "password": "$2a$10$4fAVm1xKLDyX43vE/VcjIeoQxskUODMk24p/usccLnddMC9NL4GqK",
    "imageUrl": null,
    "rewardPoints": 30
}
```
Response Body, STATUS-CODE - 200, 400
```yaml
{
    "id": 6,
    "name": "Vivek Joshi",
    "emailId": "absc@gmail.com",
    "password": "$2a$10$4fAVm1xKLDyX43vE/VcjIeoQxskUODMk24p/usccLnddMC9NL4GqK",
    "imageUrl": null,
    "rewardPoints": 30
}
```

### 8. Reset the password, PUT - http://localhost:8080/v1/user/7/password
Request Body
```yaml
{
"emailId": "abc@gmail.com",
"password": "password"
}
```
Response Body, STATUS-CODE - 200, 400
```yaml
{
    "id": 7,
    "name": "Vivek Joshi",
    "emailId": "abc@gmail.com",
    "password": "$2a$10$9jtBSyJnizl7xrpECfMJcuUn0bxoZjHnwy17oBTmVEhCcPlMmcl5y",
    "imageUrl": null,
    "rewardPoints": 0
}
```


<br>
<br>

## 2. HOTEL APIs
###  1. Register a hotel, POST - http://localhost:8080/v1/hotel/register
Request Body (email and contact should be unique) <br>
```yaml
{
  "name": "Hilton",
  "emailId": "abc2@gmail.com",
  "password": "pass"
}
```
Response Body, STATUS-CODE - 201, 400 <br>
```yaml
{
  "id": 5,
  "name": "Hilton",
  "contactNo": null,
  "description": null,
  "emailId": "abc2@gmail.com",
  "city": null,
  "country": null,
  "zipCode": null,
  "password": "$2a$10$vaYqMZ.FgiUjMO6u5nsP7OlEU98qUP0tuzdyzVBCjfkt2e4K8RF9W",
  "imageUrl": null,
  "serviceList": null
}
```

###  2. Upload image for a hotel, POST - http://localhost:8080/v1/hotel/5/upload-image
Request Body- form-data, key: file
Response Body, STATUS-CODE - 200, 400(when user id not present) <br>
####NOTE - CHECK in S3, if images are getting uploaded, url "https://alpha-hotel-images.s3.us-east-2.amazonaws.com/1649814804247Git_Cheat.jpeg"

```yaml
{
  "id": 5,
  "name": "Hilton",
  "contactNo": null,
  "description": null,
  "emailId": "abc2@gmail.com",
  "city": null,
  "country": null,
  "zipCode": null,
  "password": "$2a$10$vaYqMZ.FgiUjMO6u5nsP7OlEU98qUP0tuzdyzVBCjfkt2e4K8RF9W",
  "imageUrl": "https://alpha-hotel-images.s3.us-east-2.amazonaws.com/1651283117521Git_Cheat.jpeg",
  "serviceList": null
}
```

### 3. Update a hotel, PUT - http://localhost:8080/v1/hotel/5/update
Request Body
```yaml
{
  "contactNo": "+15566557892",
  "description" : "Hotel Test",
  "city": "San Jose",
  "country": "US",
  "zipCode": "95112",
  "serviceList": [
    {"cost": 50, "type": "FITNESS_ROOM"},
    {"cost": 50, "type": "SWIMMING_POOL"},
    {"cost": 50, "type": "DAILY_PARKING"},
    {"cost": 50, "type": "CONTINENTAL_BREAKFAST"},
    {"cost": 50, "type": "ALL_MEALS_INCLUDED"}
  ]
}
```
Response Body, STATUS-CODE - 200, 400
```yaml
{
  "id": 5,
  "name": "Hilton",
  "contactNo": "+15566557892",
  "description": "Hotel Test",
  "emailId": "abc2@gmail.com",
  "city": "San Jose",
  "country": "US",
  "zipCode": "95112",
  "password": "$2a$10$vaYqMZ.FgiUjMO6u5nsP7OlEU98qUP0tuzdyzVBCjfkt2e4K8RF9W",
  "imageUrl": "https://alpha-hotel-images.s3.us-east-2.amazonaws.com/1651283117521Git_Cheat.jpeg",
  "serviceList": [
    {
      "cost": 50,
      "type": "FITNESS_ROOM"
    },
    {
      "cost": 50,
      "type": "SWIMMING_POOL"
    },
    {
      "cost": 50,
      "type": "DAILY_PARKING"
    },
    {
      "cost": 50,
      "type": "CONTINENTAL_BREAKFAST"
    },
    {
      "cost": 50,
      "type": "ALL_MEALS_INCLUDED"
    }
  ]
}
```


###  4. Get a hotel, GET - http://localhost:8080/v1/hotel/10
Response Body, STATUS-CODE - 200, 404 <br>
```yaml
{
  "id": 10,
  "name": "Hilton",
  "contactNo": "+15566557892",
  "emailId": "abc@gmail.com",
  "city": "San Jose",
  "country": "US",
  "zipCode": "95112",
  "password": "$2a$10$gEqtz34RM9RG3HWwPfO.t.GNonPSY..px8mfyHROAd7fJvGn/Vm.G",
  "imageUrl": "https://alpha-hotel-images.s3.us-east-2.amazonaws.com/1649814804247Git_Cheat.jpeg"
}
```
### 5. Login in to a hotel, POST - http://localhost:8080/v1/hotel/login
Request Body <br>
```yaml
{
  "emailId": "abc2@gmail.com",
  "password": "pass"
}
```
Response Body, STATUS-CODE - 200, 401 <br>
```yaml
{
  "id": 5,
  "name": "Hilton",
  "contactNo": "+15566557892",
  "description": "Hotel Test",
  "emailId": "abc2@gmail.com",
  "city": "San Jose",
  "country": "US",
  "zipCode": "95112",
  "password": "$2a$10$vaYqMZ.FgiUjMO6u5nsP7OlEU98qUP0tuzdyzVBCjfkt2e4K8RF9W",
  "imageUrl": "https://alpha-hotel-images.s3.us-east-2.amazonaws.com/1651283117521Git_Cheat.jpeg",
  "serviceList": [
    {
      "cost": 50,
      "type": "FITNESS_ROOM"
    },
    {
      "cost": 50,
      "type": "SWIMMING_POOL"
    },
    {
      "cost": 50,
      "type": "DAILY_PARKING"
    },
    {
      "cost": 50,
      "type": "CONTINENTAL_BREAKFAST"
    },
    {
      "cost": 50,
      "type": "ALL_MEALS_INCLUDED"
    }
  ]
}
```

### 6. Delete a hotel, DELETE - http://localhost:8080/v1/hotel/10
Response Body, STATUS-CODE - 200, 404 <br>
Hotel with id: 10 deleted successfully




### 7. Reset the password, PUT - http://localhost:8080/v1/hotel/10/password
Request Body
```yaml
{
"emailId": "abc@gmail.com",
"password": "password"
}


  ### 8. Find all the hotels based on city GET - http://localhost:8080/v1/hotel?city=San Jose
  Request Body
  ```yaml
  {
    "emailId": "abc@gmail.com",
    "password": "password"
  }
```
Response Body, STATUS-CODE - 200, 400
```yaml
{
  "id": 10,
  "name": "Hilton",
  "contactNo": "+15566557892",
  "emailId": "abc@gmail.com",
  "city": "San Jose",
  "country": "US",
  "zipCode": "95192",
  "password": "$2a$10$KCz810dmZmX9pKN1FF052.0kT2JHU1wacJszzfQ1l2uk6FHXHAf5m",
  "imageUrl": "https://alpha-hotel-images.s3.us-east-2.amazonaws.com/1649814804247Git_Cheat.jpeg"
}
```

### 8. Get availability for a search request, 

To search hotels in San Jose from 1st April 2022 to 30th April 2022
Curl:
```yaml
curl --location --request POST 'http://127.0.0.1:8080/v1/hotel/get-availability' \
--header 'Content-Type: application/json' \
  --data-raw '{
"city": "San Jose",
"startDate": "01-04-2022",
"endDate": "30-04-2022"
}'
```
Response
```yaml
[
  {
    "hotelEntry": {
      "id": 1,
      "name": "Wyndham Garden",
      "contactNo": "+1-408-453-5340",
      "emailId": "wyndham_hello@gmail.com",
      "city": "San Jose",
      "country": "USA",
      "zipCode": "95112",
      "password": "abc",
      "imageUrl": null,
      "serviceList": [
        {
          "cost": 50,
          "type": "FITNESS_ROOM"
        },
        {
          "cost": 50,
          "type": "SWIMMING_POOL"
        },
        {
          "cost": 50,
          "type": "DAILY_PARKING"
        },
        {
          "cost": 50,
          "type": "CONTINENTAL_BREAKFAST"
        },
        {
          "cost": 50,
          "type": "ALL_MEALS_INCLUDED"
        }
      ]
    },
    "countMap": {
      "DOUBLE": 2,
      "SUITE": 1,
      "SINGLE": 2
    }
  },
  {
    "hotelEntry": {
      "id": 2,
      "name": "Hyatt Place",
      "contactNo": "+1-669-342-0007",
      "emailId": "hyatt_hello@gmail.com",
      "city": "San Jose",
      "country": "USA",
      "zipCode": "95131",
      "password": "abc",
      "imageUrl": null,
      "serviceList": [
        {
          "cost": 50,
          "type": "FITNESS_ROOM"
        },
        {
          "cost": 50,
          "type": "SWIMMING_POOL"
        },
        {
          "cost": 50,
          "type": "DAILY_PARKING"
        },
        {
          "cost": 50,
          "type": "CONTINENTAL_BREAKFAST"
        },
        {
          "cost": 50,
          "type": "ALL_MEALS_INCLUDED"
        }
      ]
    },
    "countMap": {
      "DOUBLE": 1,
      "SUITE": 2,
      "SINGLE": 1
    }
  }
]
```


## 3. ROOM APIs
###  1. Register a Room, POST - http://localhost:8080/v1/room
Request Body<br>
```yaml
{
  "hotel_id" : 4,
  "type" : "DOUBLE",
  "cost":120
}
Response-
  {
    "id": 14,
    "hotel_id": 4,
    "type": "DOUBLE",
    "cost": 120,
    "name": null,
    "description": null,
    "maxOccupants": null,
    "adults": null,
    "children": null,
    "imageUrl": null
  }
OR
 Request- 
  {
    "hotel_id" : 4,
    "type" : "SINGLE",
    "cost":100,
    "name" : "Sea Facing",
    "description" : "300 Square feets, sea facing room",
    "maxOccupants": 4,
    "adults": 2,
    "children": 2
  }
Response-
  {
    "id": 13,
    "hotel_id": 4,
    "type": "SINGLE",
    "cost": 100,
    "name": "Sea Facing",
    "description": "300 Square feets, sea facing room",
    "maxOccupants": 4,
    "adults": 2,
    "children": 2,
    "imageUrl": null
  }
```

###  2. Upload image of a room, POST - http://localhost:8080/v1/room/13/upload-image
Request Body- form-data, key: file
```yaml
Response-
  {
    "id": 13,
    "hotel_id": 4,
    "type": "SINGLE",
    "cost": 100,
    "name": "Sea Facing",
    "description": "300 Square feets, sea facing room",
    "maxOccupants": 4,
    "adults": 2,
    "children": 2,
    "imageUrl": "https://alpha-hotel-images.s3.us-east-2.amazonaws.com/1651555849007Git_Cheat.jpeg"
  }
```

###  3. Update a room, PUT - http://localhost:8080/v1/room/13/update
```yaml
Req-
  {
"type": "SINGLE",
"cost": 150,
"name": "Sea Facing",
"description": "300 Square feets, sea facing room",
"maxOccupants": 4,
"adults": 2,
"children": 2
}
Res-
  {
    "id": 13,
    "hotel_id": 4,
    "type": "SINGLE",
    "cost": 150,
    "name": "Sea Facing",
    "description": "300 Square feets, sea facing room",
    "maxOccupants": 4,
    "adults": 2,
    "children": 2,
    "imageUrl": "https://alpha-hotel-images.s3.us-east-2.amazonaws.com/1651555849007Git_Cheat.jpeg"
  }
```

###  4. Get all Rooms of a hotel, GET - http://localhost:8080/v1/room/4
```yaml
[
  {
    "id": 14,
    "hotel_id": 4,
    "name": null,
    "description": null,
    "maxOccupants": null,
    "adults": null,
    "children": null,
    "type": "DOUBLE",
    "cost": 120,
    "imageUrl": null
  },
  {
    "id": 13,
    "hotel_id": 4,
    "name": "Sea Facing",
    "description": "300 Square feets, sea facing room",
    "maxOccupants": 4,
    "adults": 2,
    "children": 2,
    "type": "SINGLE",
    "cost": 150,
    "imageUrl": "https://alpha-hotel-images.s3.us-east-2.amazonaws.com/1651555849007Git_Cheat.jpeg"
  }
]
```
###  5. Delete a Rooms of a hotel, DELETE - http://localhost:8080/v1/room/13
res-
Room with id: 13 deleted successfully