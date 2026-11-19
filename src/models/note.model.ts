import { Schema, model } from 'mongoose';
import { INote } from '../interfaces';


const noteSchema = new Schema<INote>(
  {
    title: {type: String,
        required: true, 
        trim: true, 
        maxlength: 200 
    },
    content: {type: String, 
        required: true, 
        trim: true 
    },
    owner: {type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
  },
  { timestamps: true }
);

// ---------- Indexes ----------
noteSchema.index({ owner: 1, _id: -1 });


export const Note = model<INote>('Note', noteSchema);