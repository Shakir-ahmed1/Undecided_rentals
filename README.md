RentEase

## Technologies Used

- Node.js 
- Express.js
- MongoDB - database
- ESLint - type checking
- Morgan --- logging system
- React


## ESLint

This project uses ESLint for type checking and code linting.

## MongoDB Database
This project utilizes MongoDB as its database system. [check the config directoy for details].


All main files are located in the `src` folder.

# Starting the Application

To start the application, follow these steps:

1. Navigate to the `backend` folder.
2. Open the `.env` file.
3. Locate the environmental variable `MONGODB_URI`.
4. Change the value to your locally set MongoDB URI.
5. Save the changes to the `.env` file.

After configuring the MongoDB URI, run the following command in the `backend` folder:


1. npm install
2. npm start 
 
 
you can access the Swagger API documentation for this project by visiting the following URL:

[Swagger API Documentation](http://localhost:5000/api-doc)

### User Registration

**POST /api/users/register**

Registers a new user with the provided information. The request body should include the following fields:

- `firstName`: First name of the user.
- `lastName`: Last name of the user.
- `email`: Email address of the user.
- `phoneNumber`: Phone number of the user.
- `password`: Password of the user.
- `confirmPassword`: Confirmation of the password.

If the passwords match, the password is hashed using bcrypt and the user is saved to the database. Otherwise, an error response is returned.

Responses
 201 : registration completed succesfully, responds with json body of {user : {firstName: ..., ...}}, with additional attribute 'profile' that is attached to each user after registration
 400 : registration failed, responds with errors about the user information a json body of {error: {firstName: 'Please enter your first name', ...}}

## Usage

1. Send a POST request to `/api/users/register` with the required user information in the request body.
2. If successful, the API will return a success message.
3. If there are any errors (e.g., password mismatch), the API will return an error message with details.


### Accessing API Documentation

You can access the Swagger API documentation for this project by visiting the following URL:

[Swagger API Documentation](http://localhost:5000/api-doc)

This documentation provides detailed information about the available endpoints, request parameters, and responses.

### User Login

**POST /api/users/login**

Logs in a user with the provided credentials. The request body should include the following fields:

- `email`: Email address of the user.
- `password`: Password of the user.

If the provided email exists and the password matches the stored hash in the database, the user is considered logged in. An access token is generated for the user session and stored in an HTTP-only cookie for security purposes. If the credentials are incorrect or the user does not exist, an error response is returned.

### Show all users

**GET /api/users**

Gets all users in the database as a List

## Usage

1. Send a POST request to `/api/users/login` with the user's email and password in the request body.
2. If successful, the API will return a success message along with an access token stored in an HTTP-only cookie.
3. If the credentials are incorrect or the user does not exist, the API will return an error message with details.

### Accessing API Documentation

You can access the Swagger API documentation for this project by visiting the following URL:

[Swagger API Documentation](http://localhost:5000/api-doc)

This documentation provides detailed information about the available endpoints, request parameters, and responses.

## Profile routes

### Get all users profiles
**GET /api/users/profiles**
200 : returns all profiles in as a list
500 : internal server Error

### Get the profile of a user
**GET /api/users/{userId}/profiles**
200 : the user's profile body
400 : Invalid user Id
404 : Profile with the user ID not found

### Edit user's profile (login required)
**GET /api/users/{userId}/profiles**
200 : profile updated successfully
400 : invalid request body, something wrong with the input
401 : Unautherized request
500 : internal server error


## Location routes

### add new location
**POST /api/location**
201 : Location creation was successful
400 : Bad request, creation of a location failed

### get all locations
**GET /api/location**
200 : A list of locations
500 : Internal server error

### get a location by ID
**GET /api/location/{locationId}**
200 : returns a location
404 : location wit the given locationId could not be found

### Delete a location by ID
**DELETE /api/location{locationId}**
200 : A location has been deleted successfully
404 : Location with the locationId could not be found.

## Amenities routes

### Create an amenity
**POST /api/amenities**
201 : Amenity creation was successful.
400 : Bad request, creation of amenity failed

### Get all amenites
**GET /api/ameities**
200 : A list of amenities
500 : Internal server error

### Get an amenity by ID
**GET /api/ameities/{amenityID}**
200 : Amenity object
404 : ameity with the given Id couldn't be found

### Delete an amenity by ID
**GET /api/ameities/{amenityID}**
200 : Amenity has been deleted successfully
404 : ameity with the given Id couldn't be found


## House routes

### Create a house (login required)
**POST /api/house**
201 : House creation was successful.
400 : Bad request, creation of house failed

### Get all houses
**GET /api/houses**
200 : A list of houses
500 : Internal server error

### Get a house by ID
**GET /api/houses/{houseId}**
200 : A house object
404 : House with the given Id couldn't be found
400 : Invalid house ID
500 : internal server error

### Update a house ( login required)
**PUT /api/houses/{houseId}**
200 : House updated successfully
403 : Forbidden, you are not the owner of the house
404 : page Not found
500 : Internal server error

### Delete an house by ID (log in required)
**GET /api/houses/{houseID}**
200 : House has been deleted successfully
403	: Forbidden, You are not the owner of the house.
404	: Unknown house, no house was deleted.
500	: Something went wrong.

### get my houses (log in required)
**GET /api/my_houses**
200 : A list of houses owned by the user
401 : Unauthorized, please logIn to continue.
500 : Internal server error.


## House Photos routes

### Get all house photos
**GET /api/house/photos**
200 : All house photos
500 : Intrnal server error

### Create a house photo
**POST /api/house/photos**
201 : House photos uploaded successfully
400 : Bad request - invalid file upload or missing files
500 : Internal server error

### Get a house Photo using ID
**GET /api/house/photos/{photoId}**
200 : The requested house photo
400 : Bad request - Invalid ID
404 : House photo not found
500 : Internal server error


## Search routes

### Search a house by filter
**POST /api/search**
200 : Search was successfull
500 : something went wrong


## Review routes

### create a review (login required)
**POST /api/reviews/{houseId}**
201	: Review creation was successful.
400	: Bad request, creation of a review failed, or can't review your own house.
404	: Page not found, the house specified doesn't exist.

### get all reviews
**GET /api/reviews**
200 : All reviews.
500 : Internal server error.

### get reviews made for a house
**GET /api/reviews/houses/{houseId}**
200 : A list of reviews for the house
404	: Page not found, house with the given houseId could not be found.
500	: Internal server error.

### get review by Id
**GET /api/reviews/{reviewId}**
200 : A review object
404 : page not found
500 : Internal server error

### Delete review by Id
**DELETE /api/reviews/{reviewId}**
200 : a review has been deleted successfuly
404 : Review with the reviewId could not be found
