import { DataTypes, Sequelize } from 'sequelize';
import databaseConfig from '../config/database.config';
import { Post, postModel } from './post.model';
import { User, userModel } from './user.model';

const env = process.env.NODE_ENV! || 'development';
const config = databaseConfig[env as keyof typeof databaseConfig];

export interface Models {
  User: typeof User;
  Post: typeof Post;
}
type ModelsKeys = keyof Models;

let sequelize: Sequelize = config.url
  ? new Sequelize(config.url as string, config)
  : new Sequelize(config.database!, config.username!, config.password, config);

const models: Models = {
  User: userModel(sequelize, DataTypes),
  Post: postModel(sequelize, DataTypes),
};

Object.keys(models).forEach((modelName) => {
  if (!!models[modelName as ModelsKeys].associate) {
    models[modelName as ModelsKeys].associate(models);
  }
});

export const db = {
  ...models,
  sequelize,
  Sequelize,
};
