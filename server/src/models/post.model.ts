import { CreationOptional, DataTypes, Model, Sequelize } from 'sequelize';
import { Models } from '.';

export class Post extends Model {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare authorId: number;
  declare caption: string;
  declare isPublished: CreationOptional<boolean>;

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
    this.belongsTo(models.User, {
      foreignKey: 'authorId',
      as: 'author',
    });
  }
}

export const postModel = (sequelize: Sequelize, DT: typeof DataTypes) => {
  Post.init(
    {
      id: {
        type: DT.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      authorId: {
        type: DT.BIGINT,
        field: 'authorId',
        allowNull: false,
      },
      caption: {
        type: DT.STRING,
        allowNull: false,
      },
      isPublished: {
        type: DT.BOOLEAN,
        field: 'isPublished',
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'post',
      underscored: true,
    },
  );

  return Post;
};
