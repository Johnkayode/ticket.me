import * as bcrypt from 'bcrypt';
import { User } from 'database/entity/user.entity';
import { UserService } from "../users/users.service";
import { APIResponse, APIError } from "../../common";
// import { config } from 'dotenv';

const userService = new UserService();

class AuthService {

  /**
   * Registers a new user, hashes their password and adds
   * their details to the database.
   * @param data - an interface with firstName, lastName, email,
   * phoneNumber and password fields.
   * @returns - null
  */
  async register(data: Omit<User, "id">): Promise<any> {
    
    const user = await userService.retrieveByEmail(data.email);
    if (user) {
      throw new APIError({
        message: 'User already exists.',
        status_code: 400,
      });
    }

    const password = await bcrypt.hash(data.password, 12);
    const newUser = await userService.create({ ...data, password});
    return newUser;
  }

}

export { AuthService }