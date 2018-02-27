import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

import path from 'path';


export default () => {
  const APP_ENV = process.env.APP_ENV || 'local';
  const configPath = __dirname.includes('dist')
    ? path.resolve(__dirname, '../../config') : __dirname;

  const dotenvFiles = [
    path.resolve(configPath, '.env.default'),
    path.resolve(configPath, `.env.${APP_ENV.toLowerCase()}`),
  ];

  dotenvFiles.forEach((dotenvFile) => {
    dotenvExpand(dotenv.config({ path: dotenvFile }));
  });
};
