
import express from 'express';
import connectdb from './Backend/db/connectdb.js';
import route from './Backend/routes/route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import logger from './Backend/startup/logging.js';

const app = express();
const port = process.env.PORT || 4000;

// Connect to database
connectdb();

// Middleware - MUST be before routes
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  logger.info('Morgan enabled...');
}

// Routes
app.use(route);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.message, err);
  res.status(500).send('Something went wrong!');
});

// Start server
let server;
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(port, () => {
    logger.info(`App running on port ${port}`);
    logger.info(`Environment: ${app.get("env")}`);
  });
}

export { app, server };