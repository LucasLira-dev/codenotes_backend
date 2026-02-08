import { IsBoolean } from 'class-validator';

export class UpdateVisibilityDto {
  @IsBoolean({ message: 'isPublic deve ser true ou false' })
  isPublic: boolean;
}
