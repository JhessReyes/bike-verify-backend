import pg from 'pg';

export default {
    development: {
        url: process.env.DB_URL,
        username: process.env.DB_USERNAME || "",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB || "",
        dialect: "postgres",
        dialectModule: pg,
        logging: false,
        dialectOptions: {
            ssl: false,
        },
        logging: false,
        port: process.env.DB_PORT,
        pool: {
            max: Number(process.env.DB_MAX_CONNECTIONS) || 1,
            min: 1,
            acquire: 30000,
            idle: 10000,
        },
        migrationStorage: "sequelize",
        seederStorage: "sequelize",
    },
    beta: {
        url: process.env.DB_URL,
        username: process.env.DB_USERNAME || "",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB || "",
        dialect: "postgres",
        dialectModule: pg,
        logging: false,
        dialectOptions: {
            ssl: false,

        },
        host: process.env.DB_HOST || "",
        logging: false,
        port: process.env.DB_PORT,
        pool: {
            max: Number(process.env.DB_MAX_CONNECTIONS) || 1,
            min: 1,
            acquire: 30000,
            idle: 10000,
        },
        migrationStorage: "sequelize",
        seederStorage: "sequelize",
    },
    production: {
        url: process.env.DB_URL,
        username: process.env.DB_USERNAME || "",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB || "",
        dialect: "postgres",
        dialectModule: pg,
        logging: false,
        dialectOptions: {
            ssl: false,
        },
        logging: false,
        port: process.env.DB_PORT,
        pool: {
            max: Number(process.env.DB_MAX_CONNECTIONS) || 1,
            min: 1,
            acquire: 30000,
            idle: 10000,
        },
        migrationStorage: "sequelize",
        seederStorage: "sequelize",
    },
};
