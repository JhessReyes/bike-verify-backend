import { Model, DataTypes } from 'sequelize'

export class User extends Model { static associate(models) { } }

export default (sequelize) => {
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(255),
                unique: true,
                allowNull: false
            },
            clerkId: {
                type: DataTypes.STRING(255),
                allowNull: false
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