const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();

const server = http.createServer(app);

const {PORT, SESSION_SECRET} = require('./config/serverConfig.js');
const connect = require('./config/database');

const apiRoutes = require('./routes/index');

const session = require('express-session');
app.use(session({
    secret:SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/', apiRoutes);


const path = require('path');
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, "views"));
app.use(express.static('public'));


server.listen(PORT, async()=>{
    console.log(`Server running at PORT ${PORT}`);
    await connect();
    console.log("Mongodb connected");
})
