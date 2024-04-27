import { Model, DataTypes } from 'sequelize'
import { merge } from 'lodash'

export class Invoice extends Model {
    static associate(models) {
        models.Invoice.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
            constraints: false,
        })
    }
}

export default (sequelize) => {
    Invoice.init(
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
            nameStore: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            address: {
                type: DataTypes.STRING(255),
                allowNull: true,
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
            modelName: 'invoice',
            tableName: 'tb_invoice',
            timestamps: true,
            paranoid: true,
        }
    )

    return Invoice
}