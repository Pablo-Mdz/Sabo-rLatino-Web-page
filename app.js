// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database b
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

// Handles the handlebars
// https://www.npmjs.com/package/hbs

const hbs = require('hbs');
const path = require("path");
const app = express();

app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "./views/partials"));

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// default value for title local

// Configure session
const session = require("express-session")
const MongoStore = require("connect-mongo")

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/project-services-and-products-in-berlin"
        })
    })
)
// End of session configuration
// 👇 Start handling routes here


const indexRoutes = require("./routes/index");
app.use("/", indexRoutes);

const restaurantsRoutes = require("./routes/restaurants.route");
app.use("/", restaurantsRoutes);

const auth = require("./routes/auth");
app.use("/", auth);



// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
