//First install express if it hasn't been using the command: npm install express
const express=require('express');
const app=express();
/*
MongoDB is a NoSQL database which has a structure where we have collections instead of tables,
documents instead of rows, and instead of columns, we have properties and their values within a JS object
*/
const mongoose=require('mongoose');//Import mongoose module. We create schemas and models with Mongoose
const Blog=require('./models/blog');//Import mongoDB model
const blogRoutes=require('./routes/blogRoutes');// Import router for routes 

//connection link to mongoDB database from mongoDB site
const dbLink='mongodb+srv://Faiyaz:Faiyaz125@mongo-tutorial.xaxkq.mongodb.net/mongo-tutorial?retryWrites=true&w=majority';

//Connects to mongoDB. If database doesn't exist, it is created.
mongoose.connect(dbLink)
.then((result)=>{
    app.listen(8000) //listen for incoming requests on Port 8000
})/*"then" promise which executes after connection to DB is complete. 
As connection is asynchronous, app.listen method should be within this to start listening for requests 
only after connection is complete. 
*/
.catch((err)=>console.log(err))//"catch" promise for errors

app.set('view engine','ejs');//register view engine.
/*The default folder for our views is automatically a folder named "views" 
but if you want to use a different folder for our views, use the following code after registering view engine:
app.set('views','myviewsFolder') 
 */

/*
app.use([path,] callback [, callback...]):- 
Mounts the specified middleware function or functions at the specified path: the middleware function is executed when the base of the requested path matches path.
*/
app.use(express.static('views/css')); /* To allow access to css files. Folder name used as arguement in express.static()
In html/ejs file, just write the stylesheet to be used without it path as path to css file will already 
be known once declared here*/
app.use(express.urlencoded({extended:true}));/*Middleware for taking all the URL-encoded data passed via requests 
and placing them into an object in a workable format that can be used on the request object. Typically used for accepting form data*/

app.use(blogRoutes); /**  blog routes via router. 
To scope to a specific URL, a prefix path to the routes in the router can be 
added in the following ways: app.use('/prefix',blogRoutes);
 */

app.get('/about',(req,res)=>{ //GET request handler
    console.log("Request received");
    res.render('about'); //renders a view and send it back to the browser as a response
});

app.get('/info',(req,res)=>{
    console.log("Request received");
    res.redirect('/about');
    //redirect to specified url path and  automatically sets response status code
});

app.get('/',(req,res)=>{ 
    Blog.find().sort({createdAt:-1})//returns a sorted array containing all documents.-1 means decending and 1 is ascending
    .then((result)=>res.render('index',{blogs:result} //optional 2nd parameter for passing values in an object to the template to be used and reference them using keys
    ))//send response after operation is done
    .catch((err)=>console.log(err));
});

app.post('/',(req,res)=>{ //POST request handler
    const blog=new Blog(req.body);
    blog.save() 
    .then((result)=>res.redirect('/'))
    .catch((err)=>console.log(err));
});

/*
The app.use() method should be used for routing purposes at the end because this method runs for every 
incoming request but only if it reaches the point in the code it has been invoked. Since the file is read from top to bottom, this method will not invoked
if there is a path match for the previous get(). If there is no match for the get() method, it executes the rest of the file
or else the rest of the file isn't executed. The use() method is generally used as a default case and if it is invoked
before any get() method, that get() method will never be executed and instead, the use() method will run if there aren't
any previous matches. 
*/
app.use((req,res)=>{
    res.send(`<title>File not found</title>
            <h1>404. Page Not Found</h1>`); //writing back a response to the browser in express
    //send method in express automatically infers and sets header to the infered content type and response status code
});