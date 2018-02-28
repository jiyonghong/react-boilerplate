import express from 'express';
import bodyParser from 'body-parser';
import hpp from 'hpp';

import path from 'path';
import loadConfig from 'config';

import ssr from './ssr';


loadConfig();


const __PROD__ = process.env.NODE_ENV === 'production';


export default (parameters) => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(hpp());

  if (__PROD__) {
    const PUBLIC_PATH = process.env.PUBLIC_PATH;
    if (PUBLIC_PATH && PUBLIC_PATH.startsWith('/')) {
      app.use(PUBLIC_PATH, express.static(path.resolve(__dirname, '../assets')));
    }
  }

  const assets = parameters.chunks();
  app.use(ssr(assets));

  app.listen(3000, (err) => {
    if (err) {
      return console.error(err);
    }
    return console.log('Server listening on 3000');  // eslint-disable-line
  });
};
