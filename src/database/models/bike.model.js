import { Model, DataTypes } from 'sequelize'

export class Bike extends Model {
    static associate(models) {

        models.Bike.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
            constraints: false,
        })
    }
}

export default (sequelize) => {
    Bike.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            invoiceId: {
                type: DataTypes.UUID,
                allowNull: true,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            model: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            brand: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            serialNo: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            year: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            status: {
                type: DataTypes.ENUM('ACTIVE', 'STOLEN', 'LOSS'),
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
            modelName: 'bike',
            tableName: 'tb_bike',
            timestamps: true,
            paranoid: true,
        }
    )

    return Bike
}