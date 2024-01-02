import * as bcrypt from 'bcrypt';
import { UserService } from "../users/users.service";
import { APIResponse, APIError } from "../../common";
import { config } from 'dotenv';

export default class AuthService {

    /**
   * Registers a new user, hashes their password and adds
   * their details to the database.
   * @param data - an interface with firstName, lastName, email,
   * phoneNumber and password fields.
   * @returns - null
  */
    static async Register(data): Promise<any> {
        const user = UserService.retrieveByEmail(data.email);
        if (user) {
          throw new APIError({
            message: 'User already exists.',
            status_code: 400,
          });
        }
        const password = await bcrypt.hash(data.password, 500);
        const newUser = await UserService.create({ ...data, password});
        return newUser;
      }
}