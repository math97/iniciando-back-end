
import express, { NextFunction, Response, Request } from 'express';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from './config/upload';

import './database';
import AppError from './errors/AppError';

const app = express();
app.use(express.json())

const port = 3333;
app.use('/files', express.static(uploadConfig.directory))
app.use(routes);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);


  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })

});

app.listen(port, () => {
  console.log(`🚀 Server started on port ${port} 💻`);
});
