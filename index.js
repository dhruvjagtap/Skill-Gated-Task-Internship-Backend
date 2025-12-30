const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = 3000;
const connectToMongoDB = require('./services/mongoConnection');
const staticRouter = require('./routers/static.router');
const authRouter = require('./routers/auth.router');

// Connect to MongoDB
connectToMongoDB();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Use static router for rendering static pages
app.use('/auth', staticRouter);

// Use auth router for authentication-related routes
app.use('/auth', authRouter);

// Set ejs as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});