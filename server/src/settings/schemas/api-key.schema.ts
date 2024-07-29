import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ApiKey extends Document {
  @Prop({ required: true })
  key: string;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ApiKeySchema = SchemaFactory.createForClass(ApiKey);
