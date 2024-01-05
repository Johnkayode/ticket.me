import * as bcrypt from 'bcrypt';
import { sign, SignOptions, TokenExpiredError } from 'jsonwebtoken';
import { User } from 'database/entity/user.entity';
import { UserService } from '../users/users.service';
import { APIResponse, APIError } from '../../common';
import { RegisterDTO, LoginDTO } from './auth.dto';
import config from '../../config';

const userService = new UserService();

class AuthService {
  /**
   * Registers a new user, hashes their password and adds
   * their details to the database.
   * @param data - an interface with firstName, lastName, email,
   * phoneNumber and password fields.
   * @returns - null
   */
  async register(data: RegisterDTO): Promise<any> {
    const user = await userService.retrieveByEmail(data.email);
    if (user) {
      throw new APIError({
        message: 'User already exists.',
        status_code: 400,
      });
    }

    const password = await bcrypt.hash(data.password, 12);
    const newUser = await userService.create({ ...data, password });
    return newUser;
  }

  async login(data: LoginDTO) {
    const user = await userService.retrieveByEmail(data.email);
    if (!user) {
      throw new APIError({ message: 'User does not exist.', status_code: 404 });
    }
    const match = await bcrypt.compare(data.password, user.password);
    if (!match) {
      throw new APIError({ message: 'Invalid credentials.', status_code: 401 });
    }
    delete user.password;
    return { user, token: this.tokenize(user) };
  }

  /**
   * @param payload - an object which houses the user's
   *  information.
   * @returns - a token
   */
  private tokenize(payload: any) {
    const signInOptions: SignOptions = {
      expiresIn: '1d',
    };
    return sign({ payload }, config.jwtSecretKey, signInOptions);
  }
}

export { AuthService };
