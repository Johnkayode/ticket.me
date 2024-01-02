import { UserRepository } from "./users.repository";
import { User } from "../../database/entity/user.entity";


export class UserService {
    repository = UserRepository

    async create(data: Omit<User, "id">) {
        let user = await this.repository.create(data)
        return this.repository.save(user)
    }

    async retrieveByEmail(email: string): Promise<User> {
        const user =  await this.repository.findOneBy({ email: email });

        if (!user) {
            throw new Error("User not found.");
        }
        return user
    }
}

