import { CreationOptional, DataTypes, Model, Sequelize } from 'sequelize';
import { Models } from '.';
import { hashPassword } from '../utils/bcrypt.helper';

export class User extends Model {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare password: string;
  declare birthdate: Date | null;

  // timestamps!
  // createdAt can be undefined during creation
  declare createdAt?: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt?: CreationOptional<Date>;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: Models) {
    // define association here
  }
}

export const userModel = (sequelize: Sequelize, DT: typeof DataTypes) => {
  User.init(
    {
      id: {
        type: DT.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DT.STRING,
        allowNull: false,
      },
      email: {
        type: DT.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: 'Email is invalid' },
        },
      },
      password: {
        type: DT.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8, 32],
            msg: 'Password must be between 8 and 32 characters',
          },
        },
      },
      birthdate: {
        type: DT.DATE,
        validate: {
          isDate: {
            args: true,
            msg: 'Date is invalid',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'user',
      underscored: true,
      defaultScope: { attributes: { exclude: ['password'] } },
      hooks: {
        beforeCreate: async (doc) => {
          doc.password = await hashPassword(doc.password);
          return;
        },
      },
    },
  );

  return User;
};
