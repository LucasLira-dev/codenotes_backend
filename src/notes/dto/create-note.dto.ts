import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty({ message: 'O título é obrigatório' })
  @MinLength(1, { message: 'O título não pode estar vazio' })
  @MaxLength(255, { message: 'O título deve ter no máximo 255 caracteres' })
  @Matches(/\S/, { message: 'O título não pode ser apenas espaços em branco' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'O código é obrigatório' })
  @Matches(/\S/, { message: 'O código não pode ser apenas espaços em branco' })
  code: string;

  @IsString()
  @IsNotEmpty({ message: 'A linguagem é obrigatória' })
  @MaxLength(50, { message: 'A linguagem deve ter no máximo 50 caracteres' })
  @Matches(/\S/, {
    message: 'A linguagem não pode ser apenas espaços em branco',
  })
  language: string;
}
