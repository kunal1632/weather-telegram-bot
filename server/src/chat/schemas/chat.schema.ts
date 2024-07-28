import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Chat extends Document {
  @Prop({ required: true, unique: true })
  chatId: string;

  @Prop()
  city?: string;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
