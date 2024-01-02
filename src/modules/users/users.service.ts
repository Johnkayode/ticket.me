import { UserRepository } from "./users.repository";
import { User } from "../../database/entity/user.entity";


export class UserService {
    repository = UserRepository

    async create(data: Omit<User, "id">) {
        let user = await this.repository.create(data)
        return this.repository.save(user)
    }

    async list(): Promise<User[]> {
        return this.repository.find()
    }

    async retrieveByEmail(email: string): Promise<User> {
        const user = this.repository.findOneBy({ email: email });
        return user
    }
}

