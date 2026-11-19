import { Schema, model } from 'mongoose';
import { IPost } from '../interfaces';


const postSchema = new Schema<IPost>(
  {
    title: {type: String, 
        required: true, 
        trim: true, 
        maxlength: 200 
    },
    content: {
        type: String, 
        required: true, 
        trim: true 
    },
    author: {type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
  },
  { timestamps: true }
);

// ---------- Indexes ----------
postSchema.index({ author: 1, createdAt: -1 });

export const Post = model<IPost>('Post', postSchema);