import { Sequelize } from "sequelize";
import { initUser } from './models/index.js';
import pg from 'pg';

import database from './config/database.js';
const env = process.env.NODE_ENV || 'development';
const config = database[env];
const sequelize = new Sequelize(config.url ? config.url : (config.config, config.username, config.password), { ...config, dialect: 'postgres', dialectModule: pg });

try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}

//Sequelize Define
const User = initUser(sequelize)

const db = { User }

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
