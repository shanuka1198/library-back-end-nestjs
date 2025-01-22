import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schema/book.schema';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/createBookDto';
import { UpdateBookDto } from './dto/updateBookDto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async findAllBook(): Promise<Book[]> {
    return this.bookModel.find();
  }

  async createBook(book: CreateBookDto): Promise<Book> {
    const data = Object.assign(book);
    return this.bookModel.create(data);
  }

  async findById(bookId: string): Promise<Book> {
    return this.bookModel.findOne({ bookId });
  }

  async updateById(bookId: string, book: UpdateBookDto): Promise<Book> {
    return this.bookModel.findOneAndUpdate({ bookId }, book);
  }

  async deleteById(bookId: string): Promise<Book> {
    return this.bookModel.findOneAndDelete({ bookId });
  }
}
