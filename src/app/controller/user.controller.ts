import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories/user.repositorie";
import { UserDto } from "../dto/user.dto";
import { encryptPass } from "../utils/bcryptjs";

const repository = new UserRepository()

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body as UserDto
    const password = await encryptPass(body.password)
    const data: UserDto = { ...body, password }
    const response = await repository.createUser(data)
    if (response) {
        res.status(201).json(response)
    }
}
export const list = async (req: Request, res: Response, next: NextFunction) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await repository.findAll(page, limit);

    if (result.data.length > 0) {
        res.status(200).json({
            data: result.data,
            total: result.total,
            page: result.page,
            totalPages: result.totalPages,
        });
    } else {
        res.status(404).json({
            data: [],
            total: 0,
            page,
            totalPages: 0,
        });
    }
};