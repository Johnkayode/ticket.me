import { AppDataSource } from '../../database/ormconfig';
import { User } from '../../database/entity/user.entity';

const UserRepository = AppDataSource.getRepository(User);

export { UserRepository };
