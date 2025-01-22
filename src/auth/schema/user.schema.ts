import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../enum/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  email: string;
  @Prop({ unique: true, required: true })
  username: string;
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true })
  address: string;
  @Prop({ required: true })
  password: string;
  @Prop({
    type: [{ type: String, enum: Role }],
    default: [Role.CLIENT],
  })
  role: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
