Create a repository
Initialize the repository
node_modules, package.json, package-lock.json
Install express
Create a server
Listen to port 7777
Write request handlers for /test, /hello and /
Install nodemon and update scripts inside package.json
What are dependencies
What is the use of "-g" while npm install
Difference between caret and tilde (^ vs ~)

Initialize git
gitignore
Create a remote git repository
Push all code to remote origin
Play with routes and route extensions ex. /, /hello and /hello/2
Order of the routes matter a lot
Install Postman app and make a workspace/collection > test API call
Write logic to handle GET/POST/PATCH/PUT/DELETE API calls and test them on Postman
Explore routing and use of ?, +, (), * in routes
Use of regex in routes /a/, /.*fly$/
Reading the query params in the routes
Reading the dynamic routes

Multiple Route Handlers - Play with the code
next()
next function and errors along with res.send()
app.use("/route", rH, [rH2, rH3], rH4, rH5);
What is a Middleware? Why do we need it?
How express JS basically handles requests behind the scenes
Difference between app.use and app.all
Write a dummy auth middleware for admin
Write a dummy auth middleware for all user routes, except /user/login
Error Handling using app.use("/", (err, req, res, next) => {});

Create a free cluster on MongoDB official website (Mongo Atlas)
Install mongoose library
Connect your application to the database <Connection-url>/devTinder
Call the connectDB function and connect to database before starting application on 3000
Create a user schema and user model
Create POST /signup API to add data to database
Push some documents using API calls from Postman/ Talend
Error handling using try, catch

JS Object vs JSON (difference)
Add express.json() middleware to your app
Make your signup API dynamic to receive data from the end user
User.findOne() with duplicate email ids, which object will be returned
API - Get user by emailId
API - Feed API - GET /feed - get all the users from the database
API - Get user by ID
Create a delete user API
Difference between PATCH and PUT
API - Update a user
Explore the Mongoose documentation for Model methods
What are options in findOneAndUpdate method, explore more about it
API - Update the user API with emailId

Explore schematype options from documentation
Add required, unique, lowercase, min, minLength, trim
Add default
Create a custom validate function for gender and other fields
Improve the DB schema - Put all appropriate validtions on each field in schema
Add timestamps to the User schema