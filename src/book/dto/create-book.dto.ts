import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @MinLength(1)
  readonly name: string;
}
