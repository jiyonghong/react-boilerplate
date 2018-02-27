import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

import path from 'path';


export default () => {
  const APP_ENV = process.env.APP_ENV || 'local';

  const dotenvFiles = [
    path.resolve(__dirname, '.env.default'),
    path.resolve(__dirname, `.env.${APP_ENV.toLowerCase()}`),
  ];


  dotenvFiles.forEach((dotenvFile) => {
    dotenvExpand(dotenv.config({ path: dotenvFile }));
  });
};
