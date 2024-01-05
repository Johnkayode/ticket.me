import { UserRepository } from './users.repository';
import { User } from '../../database/entity/user.entity';
import { RegisterDTO } from 'modules/auth/auth.dto';
import { RegExpOrString } from 'typeorm';

export class UserService {
  repository = UserRepository;

  async create(data: RegisterDTO) {
    let user = await this.repository.create(data);
    return this.repository.save(user);
  }

  async list(): Promise<User[]> {
    return this.repository.find();
  }

  async retrieveByEmail(email: string): Promise<User> {
    const user = this.repository.findOneBy({ email: email });
    return user;
  }
}
