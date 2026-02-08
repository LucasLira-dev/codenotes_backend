import {
  IsString,
  IsOptional,
  IsEmail,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'O nome deve ter pelo menos 1 caractere' })
  @MaxLength(255, { message: 'O nome deve ter no máximo 255 caracteres' })
  name?: string;

  @IsOptional()
  @IsString()
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  email?: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'A imagem deve ser uma URL válida' })
  image?: string;
}
