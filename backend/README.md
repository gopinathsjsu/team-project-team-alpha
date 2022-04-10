# BACKEND APIs

#1. USER APIs
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
