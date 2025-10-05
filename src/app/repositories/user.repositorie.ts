// src/app/repositories/UserRepository.ts
import { AppDataSource } from "../database/orm.db";
import { Repository } from "typeorm";
import { User } from "../entities/User";

export class UserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async createUser(data: Partial<User>): Promise<User> {
        const user = this.repository.create(data);
        return await this.repository.save(user);
    }

    async findAll(
        page: number = 1,
        limit: number = 10
    ): Promise<{
        data: User[];
        total: number;
        page: number;
        totalPages: number;
    }> {
        // findAndCount devuelve [registros, total]
        const [data, total] = await this.repository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { id: "ASC" },
        });

        const totalPages = Math.ceil(total / limit);

        return { data, total, page, totalPages };
    }

    async findById(id: number): Promise<User | null> {
        return await this.repository.findOneBy({ id });
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.repository.findOneBy({ email });
    }

    async updateUser(id: number, data: Partial<User>): Promise<User | null> {
        await this.repository.update(id, data);
        return this.findById(id);
    }

    async deleteUser(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
}
