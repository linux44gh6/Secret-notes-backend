import { Request, Response } from 'express';
import { CatchAsync } from '../utils/catchAsync';
import { noteService } from '../services/note.service';
import { sendResponse } from '../utils/sendResponse';


const createNote = CatchAsync(async (req: Request, res: Response) => {
  const result = await noteService.createNote(req.user!.id, req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Note Created Successfully',
    data: result,
  });
});

const getMyNotes = CatchAsync(async (req: Request, res: Response) => {
  const result = await noteService.getMyNotes(req.user!.id, req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Notes Retrieved Successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getAllNotes = CatchAsync(async (req: Request, res: Response) => {
  const result = await noteService.getAllNotes(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All Notes Retrieved Successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleNote = CatchAsync(async (req: Request, res: Response) => {
  const result = await noteService.getSingleNote(req.params.id as string, req.user!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Note Retrieved Successfully',
    data: result,
  });
});

const updateNote = CatchAsync(async (req: Request, res: Response) => {
  const result = await noteService.updateNote(req.params.id as string, req.user!.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Note Updated Successfully',
    data: result,
  });
});

const deleteNote = CatchAsync(async (req: Request, res: Response) => {
  const result = await noteService.deleteNote(req.params.id as string, req.user!.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Note Deleted Successfully',
    data: result,
  });
});

export const noteController = {
  createNote,
  getMyNotes,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
};