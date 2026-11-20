import { CreateNoteBody, JwtPayload, UpdateNoteBody } from '../interfaces';
import { Note } from '../models/note.model';
import AppError from '../utils/appError';

import { getPagination, buildMeta } from '../utils/pagination';

const createNote = async (userId: string, payload: CreateNoteBody) => {
  return Note.create({
    title: payload.title,
    content: payload.content,
    owner: userId, 
  });
};

const getMyNotes = async (userId: string, query:any) => {
  const { page, limit, skip } = getPagination(query);

  const [data, total] = await Promise.all([
    Note.find({ owner: userId }).sort({ _id: -1 }).skip(skip).limit(limit).lean(),
    Note.countDocuments({ owner: userId }),
  ]);

  return { data, meta: buildMeta(page, limit, total) };
};


const getAllNotes = async (query:any) => {
  const { page, limit, skip } = getPagination(query);

  const [data, total] = await Promise.all([
    Note.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate('owner', 'name email') 
      .lean(),
    Note.countDocuments(),
  ]);

  return { data, meta: buildMeta(page, limit, total) };
};


const getSingleNote = async (id: string, user: JwtPayload) => {
  const note = await Note.findById(id).lean();
  if (!note){
    throw new AppError(404, 'Note not found');
  }


  if (user.role !== 'admin' && note.owner.toString() !== user.id) {
    throw new AppError(404, 'Note not found');
  }
  return note;
};


const updateNote = async (id: string, userId: string, payload: UpdateNoteBody) => {
  const update: UpdateNoteBody = {};
  if (payload.title !== undefined){
    update.title = payload.title;
  }
  if (payload.content !== undefined){
    update.content = payload.content;
  }

  const note = await Note.findOneAndUpdate({ _id: id, owner: userId }, update, {
    new: true,
    runValidators: true,
  }).lean();

  if (!note){
    throw new AppError(404, 'Note not found');
  }
  return note;
};

const deleteNote = async (id: string, userId: string) => {
  const note = await Note.findOneAndDelete({ _id: id, owner: userId });
  if (!note) throw new AppError(404, 'Note not found');
  return null;
};

export const noteService = {
  createNote,
  getMyNotes,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
};