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
  "contactNo" : "+15566557892",
  "emailId": "abc@gmail.com",
  "city" : "San Jose",
  "country" : "US",
  "zipCode" : "95112",
  "password": "pass"
}
```
Response Body, STATUS-CODE - 201, 400 <br>
```yaml
{
  "id": 10,
  "name": "Hilton",
  "contactNo": "+15566557892",
  "emailId": "abc@gmail.com",
  "city": "San Jose",
  "country": "US",
  "zipCode": "95112",
  "password": "$2a$10$8EF4s9SudutmkQzNfhM2WehREOGruvMWMkT5UTO0rf1xAPMoQJ6wa",
  "imageUrl": null
}
```

###  2. Upload image for a hotel, POST - http://localhost:8080/v1/hotel/6/upload-image
Request Body- form-data, key: file
Response Body, STATUS-CODE - 200, 400(when user id not present) <br>
####NOTE - CHECK in S3, if images are getting uploaded, url "https://alpha-hotel-images.s3.us-east-2.amazonaws.com/1649814804247Git_Cheat.jpeg"

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

###  3. Get a hotel, GET - http://localhost:8080/v1/hotel/10
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
### 4. Login in to a hotel, POST - http://localhost:8080/v1/hotel/login
Request Body <br>
```yaml
{
  "emailId": "abc@gmail.com",
  "password": "password2"
}
```
Response Body, STATUS-CODE - 200, 401 <br>
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

### 5. Delete a hotel, DELETE - http://localhost:8080/v1/hotel/10
Response Body, STATUS-CODE - 200, 404 <br>
Hotel with id: 10 deleted successfully


### 6. Update a hotel, PUT - http://localhost:8080/v1/hotel/10/update
Request Body
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
  "password": "$2a$10$gEqtz34RM9RG3HWwPfO.t.GNonPSY..px8mfyHROAd7fJvGn/Vm.G",
  "imageUrl": "https://alpha-hotel-images.s3.us-east-2.amazonaws.com/1649814804247Git_Cheat.jpeg"
}
```

### 7. Reset the password, PUT - http://localhost:8080/v1/hotel/10/password
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
