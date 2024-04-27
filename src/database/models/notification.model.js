import { Model, DataTypes } from 'sequelize'

export class Notification extends Model {
    static associate(models) { }
}

export default (sequelize) => {
    Notification.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            type: {
                type: DataTypes.ENUM(
                    'BIKE_STOLEN',
                    'BIKE_RECOVERED',
                    'BIKE_LOST',
                ),
                allowNull: false,
            },
            importance: {
                type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH'),
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'notification',
            tableName: 'tb_notification',
            timestamps: true,
            paranoid: true,
        }
    )

    return Notification
}