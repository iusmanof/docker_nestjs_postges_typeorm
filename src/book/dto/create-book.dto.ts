export class CreateBookDto {
  @IsNotEmpty()
  @MinLength(1)
  readonly name: string;
}
