const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const connectToMongoDB = require('./services/mongoConnection');
// const staticRouter = require('./routers/static.router');
const authRouter = require('./routers/auth.router');
const studentRouter = require('./routers/student.router');
const orgRouter = require('./routers/org.router');
const adminRouter = require('./routers/admin.routes');

/* ------------------ DB ------------------ */
connectToMongoDB(process.env.MONGO_URI);

/* ------------------ VIEW ENGINE ------------------ */
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

/* ------------------ LAYOUTS ------------------ */
app.use(expressLayouts);
app.set('layout', 'layouts/dashboard'); // default layout

/* ------------------ MIDDLEWARE ------------------ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

/* ------------------ ROUTES ------------------ */
// app.use('/', staticRouter);
app.use('/auth', authRouter);
app.use('/student', studentRouter);
app.use('/org', orgRouter);
app.use('/admin', adminRouter);


// app.get('/', checkAuth, (req, res) => {
//     res.render('home', { layout: false }); // home has NO dashboard
// });
/* ------------------ SERVER ------------------ */
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
