import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import passport from 'passport';
import path from 'path';
import http from 'http';
import routes from '../server/routes';
import connect from '../server/lib/db';
import dbConfigJson from '../server/config.json';

dotenv.config({ path: `${__dirname}/.env` });

// Set up the express app
const app = express();

const dbConfig = dbConfigJson[app.get('env')];
connect(dbConfig.mongoUrl);
const server = http.createServer(app);

app.use(express.static('client/dist/'));
// Configure environment variables
dotenv.config({ path: './.env' });

// Log requests to the console
app.use(logger('dev'));

// Parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  next();
});

// Configure session
app.set('superSecret', process.env.SECRET_KEY);

// Configure passport for app
app.use(passport.initialize());
app.use(passport.session());
// Import our routes into the application
routes(app);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});


server.listen(process.env.PORT || 3000);
console.log('Listen to app at port...', 3000);

export default app;
