import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UserDto {
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @Length(2, 50, { message: 'El nombre debe tener entre 2 y 50 caracteres' })
    name: string;

    @IsEmail({}, { message: 'El email no es válido' })
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string
}
