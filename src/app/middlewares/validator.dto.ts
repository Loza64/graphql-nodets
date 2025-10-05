import { plainToInstance, ClassConstructor } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import "reflect-metadata";

export default function validateDTO<T extends object>(dtoClass: ClassConstructor<T>) {
    return async (req: Request, res: Response, next: NextFunction) => {

        const dto = plainToInstance(dtoClass, req.body);

        const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });

        if (errors.length > 0) {
            const messages = errors.flatMap(err => Object.values(err.constraints ?? {}));
            return res.status(400).json({
                status: "error",
                message: "Validación fallida",
                errors: messages,
            });
        }

        next();
    };
}
