import mongoose from 'mongoose';
import { envSchema } from './constants.js';
import { logger } from '../utils/logger.js'

const MAX_RETRIES = 5;
const RETRY_DELAY = 3000;
let connectionRetries = 0;


const connectDB = async () => {
    try {
        const connection = await mongoose.createConnection(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: process.env.NODE_ENV === 'production' ? 50 : 10,
            minPoolSize: 5,
            family: 4,
            readReference: 'secondaryPreferred',
            writeConcern: {
                w: 'majority', 
                j: true
            },
            authSource: 'admin',
            retryWrites: true,
            bufferCommnads: false,
            autoIndex: process.env.NODE_ENV !== 'production',
            ssl: process.env.NODE_ENV === 'production',
            sslValidate: true,
            sslCA: process.env.MONGODB_CA_PATH || undefined
        });

        connection.on('disconnected', () => {
            logger.warn('MongoDB disconnected!');
            if (connectionRetries < MAX_RETRIES) {
                setTimeout(connectDB, RETRY_DELAY);
                connectionRetries++;
            }
        });

        connection.on('error', (err) => {
            logger.error(`MongoDB connection error: ${err.message}`);
            if (err.code === 'ETMEDOUT') {
                connection.close().then(connectDB);
            }
        });

        // test the connection
        await connection.db.admin().ping();
        logger.info('MongoDB ping successful');

        return connection;
    } catch (error) {
        logger.error(`MongoDB initial connection failed: ${error.message}`);
        process.exit(1);
    }
};

// shutdown
const closeDB = async () => {
    try {
        await mongoose.disconnect();
        logger.info('MongoDB connection closed');
    } catch (error) {
        logger.error(`Error closing MongoDB connection: ${error.message}`);
    }
};

process.on('SIGTERM', closeDB);
process.on('SIGINT', closeDB);
process.on('uncaughtException', (err) => {
    logger.error(`Uncaught Exception: ${err.message}`);
    closeDB().then(() => process.exit(1));
});

export { connectDB, closeDB }
