import express from 'express';
import bodyParser from 'body-parser';
import hpp from 'hpp';

import ssr from './ssr';


export default (parameters) => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(hpp());

  const assets = parameters.chunks();
  app.use(ssr(assets));

  app.listen(3000, (err) => {
    if (err) {
      return console.error(err);
    }
    return console.log('Server listening on 3000');
  });
};
