//First install express if it hasn't been using the command: npm install express
const express = require("express");
const app = express();

/*
MongoDB is a NoSQL database which has a structure where we have collections instead of tables,
documents instead of rows, and instead of columns, we have properties and their values within a JS object
*/
const morgan = require("morgan"); //HTTP request logger middleware for node.js
const mongoose = require("mongoose"); //Import mongoose module. We create schemas and models with Mongoose

//For session-based authentication
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const Blog = require("./models/blog"); //Import mongoDB model
const blogRoutes = require("./routes/blogRoutes"); // Import router for routes
const authRoutes = require("./routes/authRoute");

//connection link to mongoDB database from mongoDB site
const dbURI = "mongodb://localhost:27017/blog-app";
//Connects to mongoDB. If database doesn't exist, it is created.
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Connected to mongoDB database");
    app.listen(8000, () =>
      console.log("Application running on localhost:8000")
    ); //listen for incoming requests on Port 8000
  }) /*"then" promise which executes after connection to DB is complete. 
As connection is asynchronous, app.listen method should be within this to start listening for requests 
only after connection is complete. 
*/
  .catch((err) => console.log(err)); //"catch" promise for errors

app.set("view engine", "ejs"); //register view engine.
/*The default folder for our views in express is automatically a folder named "views" 
but if you want to use a different folder for our views, use the following code after registering view engine:
app.set('views','myviewsFolder') 
 */

/*
app.use([path,] callback [, callback...]):- 
Mounts the specified middleware function or functions at the specified path: the middleware function is executed when the base of the requested path matches path.
*/
app.use(morgan("dev"));
app.use(
  "",
  express.static(__dirname + "/assets")
); /* To allow access to static files such as images and css. Folder name used as arguement in express.static()
In html/ejs file, just write the remaining path to the static file from the path specified in the second argument to output them in the file.
If the first argument is a non-empty string, it will be added as the prefix to the path of the static file when fetched on the Internet.
*/
app.use(
  express.urlencoded({ extended: true })
); /*Middleware for taking all the URL-encoded data passed on incoming requests 
and parsing it to convert them into a JS object available via the body object on the request object. Typically used for accepting form data.

The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true). 
The “extended” syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.

This does not handle multipart bodies, due to their complex and typically large nature. For multipart bodies, you may be interested in the following modules:
1)busboy and connect-busboy
2)multiparty and connect-multiparty
3)formidable
4)multer
*/

app.use(
  express.json()
); /*Middleware for taking incoming requests with JSON payloads
and parsing JSON data to a JS object available via the body object on the request object. Typically used for REST API.
*/

//Creating a store for sessions in the database
const store = new MongoDBStore({
  uri: dbURI,
  collection: "mySessions",
});

//Session ID cookie is by default HTTP-only and session data is not saved in the cookie itself but is stored server-side. Use req.session to store or access session data.
//For more info, visit: https://expressjs.com/en/resources/middleware/session.html

app.use(
  session({
    //Create a session middleware with the given options
    secret: "8da825aa143b22493ad1914fdeceab4d9e01e3421b22d27cac0366eaa43c8bcf", //This is the secret used to sign the session ID cookie. This key has been generated using require('crypto').randomBytes(32).toString('hex')
    resave: false /* Forces the session to be saved back to the session store, even if the session was never modified during the request. 
    Default is true but typically you’ll want false because can also create race conditions where a client makes two parallel 
    requests to your server and changes made to the session in one request may get overwritten when the other request ends, even 
    if it made no changes (this behavior also depends on what store you’re using).
    */,
    saveUninitialized: false /*Forces a session that is “uninitialized” to be saved to the store. 
    A session is uninitialized when it is new but not modified. The default value is true, but choosing false is useful for 
    implementing login sessions, reducing server storage usage, or complying with laws that require permission before setting a 
    cookie. Choosing false will also help with race conditions where a client makes multiple parallel requests without a session.
    */,
    store: store, //The session store instance
  })
);

// all express routes can use mupltiple middlewares after the first argument.
//Each middleware in a route can take upto 3 arguments in the following order: req, res, next.

/*
The app.use() method  runs for every incoming request but only if it reaches the point in the code it has been invoked. 
Since the file is read from top to bottom, this method will not invoked if there is a path match for the previous routes and a response is sent. 
If there is no match, it executes the rest of the file or else the rest of the file isn't executed unless next() is called at the end. 
If the use() method is invoked before route method, unless next() is called at the of the middleware, that route method will never be executed and instead, the use() method will run if 
there aren't any previous matches.
*/
app.use((req, res, next) => {
  // Will be called before any matched routes below it
  res.locals.user = req.session.user;
  next();
});

app.use(authRoutes); //authentication routes via router
app.use(
  "/blogs",
  blogRoutes
); /**  blog routes via router. 
To scope to a specific URL, a prefix path to the routes in the router can be 
added in the following ways: app.use('/prefix',blogRoutes);
However, keep in mind that that routes defined in other routes must not start with this prefix or else there will be error
 */

app.get("/about", (req, res) => {
  //GET request handler
  res.locals.header = "About this project";
  res.render("about"); //renders a view and send it back to the browser as a response
});

app.get("/info", (req, res) => {
  res.redirect("/about");
  //redirect to specified url path and  automatically sets response status code
});

app.get("/", (req, res, next) => {
  res.locals.header = "Welcome to the homepage";
  Blog.find()
    .sort({ createdAt: -1 })
    .populate("author", "name _id") //returns a sorted array containing all documents.-1 means decending and 1 is ascending
    .then((result) =>
      res.render(
        "index",
        { blogs: result } //optional 2nd parameter for passing values in an object to the template to be used and reference them using keys
      )
    ) //send response after operation is done
    .catch((err) => next(err)); //Pass to internal server error handler via next()
});

//Middleware function for Page not found handling
app.use((req, res) => {
  res.status(404).send(`<title>Not found</title>
        <h1>404. Page Not Found</h1>`); //writing back a response to the browser in express
  //send method in express automatically infers and sets header to the infered content type and response status code
});

/*
Define error-handling middleware functions in the same way as other middleware functions, 
except error-handling functions have four arguments instead of three: (err, req, res, next).
*/
//Used for Internal server error handling
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send("Internal Server Error");
});
