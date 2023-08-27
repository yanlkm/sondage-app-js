// requires
const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const passport = require('passport')
const session = require('express-session')
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const {checkUserClassic, requireAuth} = require('./middlewares/auth.cookie')
const axios = require('axios')



// Load config
dotenv.config({ path: './config/config.env' })

// load passport
require('./config/passport')(passport)


// connect to DB
connectDB()

const app = express()


// Middleware to enable CORS


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // l'URL  frontend
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true); // Autorise l'envoi de cookies d'authentification (important pour les requêtes avec withCredentials dans Axios)
  next();
});



//cookie parser 
app.use(cookieParser())

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erreur interne du serveur." });
});

// app.get('*', checkUserClassic)

app.use('/jwtid', requireAuth, (req, res) => {
  res.status(201).send(res.locals.user._id)
})



//body-parser 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))

/* handlebars 
 app.engine('hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}))
 app.set('view engine', 'hbs')*/

//express session 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
  }))



// Passport session
app.use(passport.initialize())
app.use(passport.session())

//static folder 
// app.use(express.static(path.join(__dirname,'public'))) 

// routes 
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/user', require('./routes/user'))
app.use('/etablishment', require('./routes/factory'))



const PORT = process.env.PORT || 5000 

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
