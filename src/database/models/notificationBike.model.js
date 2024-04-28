import { Model, DataTypes } from 'sequelize'

export class NotificationBike extends Model {
    static associate(models) {
        models.NotificationBike.belongsTo(models.User, {
            foreignKey: 'userId',
            constraints: false,
        })

        models.NotificationBike.belongsTo(models.Bike, {
            foreignKey: 'bikeId',
            as: 'bike',
            constraints: false,
        })

        models.NotificationBike.belongsTo(models.Notification, {
            foreignKey: 'notificationId',
            constraints: false,
        })
    }
}

export default (sequelize) => {
    NotificationBike.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            bikeId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            notificationId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            includeInvoice: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            isGlobal: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            location: {
                type: DataTypes.JSON,
                comment: 'Ubicación',
                allowNull: true,
                set(val) {
                    let location = this.getDataValue('location')
                    this.setDataValue('location', merge({}, location, val))
                },
            },
            date: {
                type: DataTypes.DATE,
                allowNull: true
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            files: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: []
            },
        },
        {
            sequelize,
            modelName: 'notification_bike',
            tableName: 'tb_notification_bike',
            timestamps: true,
            paranoid: true,
        }
    )

    return NotificationBike
}