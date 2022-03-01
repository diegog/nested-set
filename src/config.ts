import dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/../.env`});

export default {
  port: +process.env.API_PORT || 3000,
  db: {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
};
