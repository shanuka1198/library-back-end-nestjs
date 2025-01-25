import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BarrowDocument = Barrows & Document;

@Schema()
export class Barrows {
  @Prop({ unique: true, required: true })
  bookId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  author: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  address: string;
  @Prop({ required: true })
  startDate: Date;
  @Prop({ required: true })
  endDate: Date;
}
export const BarrowSchema = SchemaFactory.createForClass(Barrows);
