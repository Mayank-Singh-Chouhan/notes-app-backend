// Load env variables
if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}


// Import dependencies
const express = require("express");
const connectToDB = require("./config/connetToDb");
const notesController = require("./controllers/notesController");
const usersController = require("./controllers/usersController");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const requireAuth = require("./middleware/requireAuth");



// Create an express app
const app = express();


// Configure expres app
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(cookieParser());


// Connect to db
connectToDB();


// Routes (Notes)
app.post('/notes', requireAuth, notesController.createNote);
app.get('/notes', requireAuth, notesController.fetchNotes);
app.get('/notes/:id', requireAuth, notesController.fetchNote);
app.put('/notes/:id', requireAuth, notesController.updateNote);
app.delete('/notes/:id', requireAuth, notesController.deleteNote);


// Routes (Users)
app.post('/signup', usersController.signup);
app.post('/login', usersController.login);
app.get('/logout', usersController.logout);
app.get('/check-auth', requireAuth, usersController.checkAuth)


// Start our server
app.listen(process.env.PORT);