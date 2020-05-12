import express, { Request } from 'express';
import { ForbiddenError } from '../core/ApiError';
import validator, { ValidationSource } from '../helpers/validator';
import asyncHandler from '../helpers/asyncHandler';
import { apiKey } from '../config';
import schema from './schema';

const router = express.Router();

export default router.use(validator(schema.apiKey, ValidationSource.HEADER),
    asyncHandler(async (req: Request, res, next) => {
        if (req.headers['x-api-key'].toString() !== apiKey) throw new ForbiddenError();
        return next();
    }));
