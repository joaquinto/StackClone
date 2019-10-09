# StackClone
[![Build Status](https://travis-ci.org/joaquinto/StackClone.svg?branch=develop)](https://travis-ci.org/joaquinto/StackClone)  [![Maintainability](https://api.codeclimate.com/v1/badges/5ac621725750ea8b9f24/maintainability)](https://codeclimate.com/github/joaquinto/StackClone/maintainability)  [![Test Coverage](https://api.codeclimate.com/v1/badges/5ac621725750ea8b9f24/test_coverage)](https://codeclimate.com/github/joaquinto/StackClone/test_coverage) [![Coverage Status](https://coveralls.io/repos/github/joaquinto/StackClone/badge.svg?branch=develop)](https://coveralls.io/github/joaquinto/StackClone?branch=develop)

StackClone is a stackoverflow clone project.
___

**Features Implemented**
1. Users sign up.
2. Users sign in.
3. Users can view all users.
4. Users can ask question.
5. Users can view questions.
6. Users can view a specific question.
7. Users can upvote a question.
8. Users can downvote a question.
9. Users can answer a question.
10. Users can search for users by display name.
11. Users can search for questions or answers.
12. Users can subscribe for notifications.

___

## Prerequisites

* You should have [Node.js](https://nodejs.org/en/) installed on your local machine.
* You should have [MongoDB](https://www.mongodb.com/download-center/enterprise) installed on your local machine.
* You should have [Git](https://git-scm.com/downloads) installed on your machine to clone the project.
* You should have [Redis](https://redis.io/download) installed on your local machine for this application to function as expected.
* You also need to create a `.env` file in the project root folder.

### Note
After creating the `.env` file, add a secret key, port, salt round, redis and mongoDB database of your choosing.

```
PORT = 5000
SECRET_KEY = XXXXXXXXXX
SALT_ROUND = XXXXXXX
MONGODB_URI = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
REDIS_URL = XXXXXXXXXXXXXXXX
```
___

## API Documentation

The official API documentation for this project can be located here  
[StackClone API Documentation](https://stack-clone.herokuapp.com/api-docs)
___


## Technologies Used
* [Node.js](https://nodejs.org/en/) - A runtime environment based off of Chromes's V8 Engine for writing Javascript server-side applications.
* [Express.js](https://expressjs.com/) - Web application framework based on Node.js.
* [ESLint](https://eslint.org/) - A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
* [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb) style guide was followed.

___


## Testing Tools
* [Mocha](https://mochajs.org/) - A JavaScript test framework.
* [Chai](https://www.chaijs.com/) - A test assertion library for JavaScript.
* [Chai-Http](https://www.npmjs.com/package/chai-http) - A module that provides high-level abstraction for HTTP testing.

___


## API Information
The API endpoints are hosted on Heroku - [StackClone](https://stack-clone.herokuapp.com/)

|METHOD  |DESCRIPTION                        |ENDPOINT                                  |
|------- |-----------------------------------|------------------------------------------|
|POST    |Sign Up                            |/api/v1/auth/signup                        |
|POST    |Sign In                            |/api/v1/auth/signin                        |
|GET    |View all users          |/api/v1/users                         |
|POST   | Post question           | /api/v1/questions  |
|GET   | View all questions           | /api/v1/questions  |
|GET   | View a specific question           | /api/v1/questions/:questionId  |
|PATCH    | Upvote a question        | /api/v1/questions/:questionId/upvote  |
|PATCH    | Down vote a question               | /api/v1/questions/:questionId/downvote   |
|POST   | Answer a question                    | /api/v1/questions/:questionId/answers   |
|GET    | Search for users        | /api/v1/users/search/?displayName={displayName}      |
|GET    | Search for questions or answers   | /api/v1/questions/search/?question={question}  |
|PATCH  | User can subscribe for notifications  | /api/v1/users/subscribe   |

|DESCRIPTION         |REQUIRED FIELDS                                                    |                 
|--------------------|-------------------------------------------------------------------|
|Sign Up             |displayName, email, password                              |
|Sign In             |email, password                                                    |
|Create a question| title, details, tags   |
|Answer a question | question id, body   |

___
## The Endpoints can be accessed remotely or locally.

#### Accessing the endpoints remotely via POSTMAN
You will need to have [POSTMAN](https://www.getpostman.com/downloads/) app installed on your computer.

##### Example
###### Sign In
1. Launch POSTMAN
2. Click the dropdown menu to the left of the URL bar and select POST as a method.
3. To access the Sign In endpoint, at the end of StackClone's URL attach the sign in endpoint to it as seen in step 4
4. https://stack-clone.herokuapp.com/api/v1/auth/signin
5. Then paste the full URL in the URL bar.
6. Click 'Body' tab below the URL, then select x-www-form-urlencoded radio button.
7. Fill in the required fields correctly.
8. Click the blue Send button to the right of the URL bar.
9. And wait for a response below.


#### Accessing the endpoints locally via POSTMAN

1. On the terminal of your computer, navigate into the cloned repo's folder
2. Click [npm](https://www.npmjs.com/get-npm) and [Node.js](https://nodejs.org/en/) to get npm and node respectively.
3. Clone StackClone repo `https://github.com/joaquinto/StackClone.git` on your local machine.
4. Run `$ npm install` to install All of StackClone's dependencies.
5. Run `$ npm run start:dev` to power up the server.
6. The procedure for using POSTMAN here is the same as when accessing the endpoint remotely except that you make use of http://localhost:5000 as the full URL's prefix in place of the app's URL on heroku
e.g To access Sign In endpoint you will have a full URL like http://localhost:5000/api/v1/auth/signin

#### Test
You can locally run the test by running `npm test` in the cloned repo directory opened in a new terminal window while the server runs on the first window. It is important that the server is running for the tests to pass.

___

## Author
### Odjegba Jonathan (Joaquinto)
