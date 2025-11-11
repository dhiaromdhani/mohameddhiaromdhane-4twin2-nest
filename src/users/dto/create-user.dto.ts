import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Le nom d’utilisateur est obligatoire.' })
  username: string;

  @IsEmail({}, { message: 'Adresse email invalide.' })
  email: string;

  @IsOptional()
  status?: string;
}
