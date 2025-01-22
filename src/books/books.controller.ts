import {
  Body,
  Controller, Delete,
  Get,
  Param,
  Post,
  Put, UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './schema/book.schema';
import { CreateBookDto } from './dto/createBookDto';
import { UpdateBookDto } from './dto/updateBookDto';
import { Roles } from '../auth/decorator/role.decorator';
import { Role } from '../auth/enum/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/role.guards';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  async findAllBook(): Promise<Book[]> {
    return this.booksService.findAllBook();
  }

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  async createBook(
    @Body(new ValidationPipe()) book: CreateBookDto,
  ): Promise<Book> {
    return this.booksService.createBook(book);
  }

  @Get(':bookId')
  async findById(@Param('bookId') bookId: string): Promise<Book> {
    return this.booksService.findById(bookId);
  }

  @Put(':bookId')
  async updateById(
    @Param('bookId') bookId: string,
    @Body(new ValidationPipe()) book: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.updateById(bookId, book);
  }

  @Delete(':bookId')
  async deleteById(@Param('bookId') bookId: string): Promise<Book> {
    return this.booksService.deleteById(bookId);
  }
}
