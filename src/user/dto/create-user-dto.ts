import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
    example: "marcos", description: "credeciais do usuario",
  })
  @IsString({ message: "O nome deve ser uma string" })
  @IsNotEmpty({ message: "O nome é obrigatório" })
  name: string;

  @IsString({message: "o email deve ser uma string"})
  @IsNotEmpty({message: "o email é obrigatório"})
  email: string;

  @IsString({message: "a senha deve ser uma string"})
  @IsNotEmpty({message: "a senha é obrigatória"})
  password: string;

}