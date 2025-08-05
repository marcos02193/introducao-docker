import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsNotEmpty } from "class-validator";

export class CreateProductDto {
  @ApiProperty({
    example: "esponja", description: "nome do produto",
  })
  @IsString({ message: "O nome deve ser uma string" })
  @IsNotEmpty({ message: "O nome é obrigatório" })
  name: string;

  @ApiProperty({
    example: "esponja de lavar louça", description: "descrição do produto",
  })
  @IsString({ message: "A descrição deve ser uma string" })
  @IsNotEmpty({ message: "A descrição é obrigatória" })
  description: string;

  @ApiProperty({
    example: 10.99, description: "preço do produto",
  })
  @IsNotEmpty({ message: "O preço é obrigatório" })
  price: number;
}