import express, { Request } from 'express';
import asyncHandler from '../../../helpers/asyncHandler';
import { SuccessResponse } from '../../../core/ApiResponse';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
import NoteRepo from '../../../database/repository/NoteRepo';
import { BadRequestError } from '../../../core/ApiError';
import _ from 'lodash';
import { Types } from 'mongoose';

const router = express.Router();

router.get('/', validator(schema.search, ValidationSource.QUERY),
    asyncHandler(async (req: Request, res, next) => {

        const query: any = {};
        if (req.query.content) query.content = new RegExp(`${req.query.content}.*`);

        const notes = await NoteRepo.find(query);

        return new SuccessResponse('success', notes).send(res);
    }));

router.post('/', validator(schema.create, ValidationSource.BODY),
    asyncHandler(async (req: Request, res, next) => {
        const duplicate = await NoteRepo.find({content: req.body.content});
        if (duplicate.length > 0) throw new BadRequestError(`Note "${req.body.content}" already exists.`);

        const createdNote = await NoteRepo.create(req.body.content, false);
        return new SuccessResponse('success', createdNote).send(res);
    }));

router.put('/:id', validator(schema.update, ValidationSource.BODY), validator(schema.id, ValidationSource.PARAM),
    asyncHandler(async (req: Request, res, next) => {
        const note = await NoteRepo.findById(new Types.ObjectId(req.params.id));
        if (!note) throw new BadRequestError(`Note with id ${req.params.id} not exist.`);

        const updates = _.pick(req.body, ['content', 'done']);
        Object.assign(note, updates);

        const updatedNote = await NoteRepo.update(new Types.ObjectId(req.params.id), note.content, note.done);
        return new SuccessResponse('success', updatedNote).send(res);
    }));

router.delete('/:id', validator(schema.id, ValidationSource.PARAM),
    asyncHandler(async (req: Request, res, next) => {
        const note = await NoteRepo.findById(new Types.ObjectId(req.params.id));
        if (!note) throw new BadRequestError(`Note with id ${req.params.id} not exist.`);

        const removedNote = await NoteRepo.remove(new Types.ObjectId(req.params.id));
        return new SuccessResponse('success', removedNote).send(res);
    }));

export default router;
