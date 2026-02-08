import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateFavoriteDto {
  @IsString()
  @IsNotEmpty({ message: 'O ID da nota é obrigatório' })
  @IsUUID('4', { message: 'O ID da nota deve ser um UUID válido' })
  noteId: string;
}
