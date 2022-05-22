import createHttpError from 'http-errors';
import { LoginUserDTO, RegisterUserDTO, RegisterUserResponse } from '../dtos/auth.dto';
import { db } from '../models';
import { comparePassword } from '../utils/bcrypt.helper';
import { createToken } from '../utils/jwt.helper';

export class AuthService {
  constructor(private readonly database: typeof db) {}

  private loginError() {
    throw createHttpError(400, 'Email or Password is invalid');
  }

  async findEmail(email: string) {
    const user = await this.database.User.findOne({ where: { email } });
    if (user) throw createHttpError(409, 'Email already exist');
  }

  async register(registerUserDTO: RegisterUserDTO): Promise<RegisterUserResponse> {
    const { name, email, password, birthdate } = registerUserDTO;
    await this.findEmail(email);
    const user = await this.database.User.create({
      name,
      email,
      password,
      birthdate,
    });
    return user;
  }

  async login(loginDTO: LoginUserDTO) {
    const { email, password } = loginDTO;
    const user = await this.database.User.findOne({
      where: { email },
      attributes: { include: ['password'] },
    });
    if (!user) throw this.loginError();

    const passwordMatched = await comparePassword(password, user.password);
    console.log(user.password, password);

    if (!passwordMatched) throw this.loginError();

    const token = createToken(user);
    return token;
  }
}

export default new AuthService(db);
