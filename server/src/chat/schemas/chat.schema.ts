import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({ required: true })
  chatId: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: false })
  lastName: string;

  @Prop({ required: true })
  city: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
