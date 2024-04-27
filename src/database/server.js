import { Sequelize } from "sequelize";
import {
    initUser,
    initBike,
    initNotification,
    initNotificationBike,
    initInvoice
} from './models/index.js';
import pg from 'pg';

import database from './config/config.js';
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
const Bike = initBike(sequelize)
const Notification = initNotification(sequelize)
const NotificationBike = initNotificationBike(sequelize)
const Invoice = initInvoice(sequelize)

const db = { User, Invoice, Bike, Notification, NotificationBike }

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
export { sequelize, Sequelize, User, Bike, Notification, NotificationBike, Invoice };