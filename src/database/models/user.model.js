import { Model, DataTypes } from 'sequelize'
import { merge } from 'lodash'

export class User extends Model { static associate(models) { } }

export default (sequelize) => {
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            clerkId: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            surname: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING(255),
                unique: true,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING(255),
                defaultValue: null,
                allowNull: true
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
            public: {
                type: DataTypes.JSON,
                allowNull: true
            },
            private: {
                type: DataTypes.JSON,
                allowNull: true
            }
        },
        {
            sequelize,
            modelName: 'user',
            tableName: 'tb_user',
            timestamps: true,
            paranoid: true,
        }
    )

    return User
}