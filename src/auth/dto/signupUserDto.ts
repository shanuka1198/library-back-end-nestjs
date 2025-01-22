import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../enum/role.enum';

export class SignupUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsString()
  @IsNotEmpty()
  address: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsArray()
  role?: Role[];
}
