import dotenv from 'dotenv';

dotenv.config();

const config = {
    app: {
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV || 'development'
    },

    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5431,
        name: process.env.DB_NAME || 'order_fulfillment',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || ''
    },

    auth: {
        jwtSecret: process.env.JWT_SECRET || 'dev_secret',
        jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h'
    }
};

export default config;