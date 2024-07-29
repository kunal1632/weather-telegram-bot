import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  //   @Prop({ required: true, enum: ['user', 'admin'], default: 'user' })
  //   role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
