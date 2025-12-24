import winston from 'winston';
import 'winston-mongodb';
import 'express-async-errors'; 
import config from 'config';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.MongoDB({
      db: config.get('database.url'),
      options: { useUnifiedTopology: true },
      level: 'info' 
    })
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// Handle uncaught exceptions and unhandled rejections
winston.exceptions.handle(
  new winston.transports.File({ filename: 'exceptions.log' })
);

process.on('unhandledRejection', (ex) => {
  throw ex;
});

export default logger;
