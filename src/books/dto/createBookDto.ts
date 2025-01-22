import { Category } from '../schema/book.schema';
import { IsEmpty, IsEnum, IsNotEmpty, IsString, Min } from 'class-validator';
import { User } from '../../auth/schema/user.schema';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  bookId: string;
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsString()
  author: string;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  @IsString()
  @IsEnum(Category)
  category: Category;
  @IsEmpty({ message: 'you can not pass user id' })
  user: User;
}
