import { dataSource } from './../typeorm/index';
import 'reflect-metadata';
import { app } from './app';

dataSource
  .initialize()
  .then(() => {
    // eslint-disable-next-line no-console
    app.listen(3000, () => console.log('listening to port 3000'));
  })
  .catch(err => console.error(err));
