import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../auth/schema/user.schema';

export type BookDocument = Book & Document;

export enum Category {
  ADVENTURE = 'Adventure',
  CLASSICS = 'Classics',
  CRIME = 'Crime',
  FANTASY = 'Fantasy',
}

@Schema()
export class Book {
  @Prop({ unique: true, required: true })
  bookId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, enum: Category })
  category: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true })
  quantity: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
