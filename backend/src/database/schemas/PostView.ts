import mongoose from '../index';
import { Document, Schema, SchemaTypes } from 'mongoose';

type PostView = Document & {
  post_slug: string;
};

const PostViewSchema = new Schema(
  {
    post_slug: {
      type: SchemaTypes.String,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<PostView>('PostView', PostViewSchema);
