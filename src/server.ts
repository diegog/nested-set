import app from './app';
import config from './config';

// start the express server
app.listen(config.port, () => {
  console.log(`Server started at http://localhost:${config.port}`);
});
