import createHttpError from 'http-errors';
import { db } from '../models';

export class UserService {
  constructor(private readonly database: typeof db) {}

  async myProfile(userId: number) {
    const user = await this.database.User.findByPk(userId);
    if (!user) throw createHttpError(404, 'User not found');

    return user;
  }

  async profileId(userId: number) {
    const user = await this.database.User.findByPk(userId, {
      attributes: { exclude: ['email'] },
    });
    if (!user) throw createHttpError(404, 'User not found');

    return user;
  }
}
export default new UserService(db);
