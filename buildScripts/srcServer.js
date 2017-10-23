import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import path from 'path';
import open from 'open';
import routes from '../server/routes';
import config from '../webpack.config.dev';
import connect from '../server/lib/db';
import dbConfigJson from '../server/config.json';
import User from '../server/models/userModel';

const port = 3000;
const compiler = webpack(config);
const app = express();
const dbConfig = dbConfigJson[app.get('env')];
connect(dbConfig.mongoUrl);

// Parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

routes(app);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
