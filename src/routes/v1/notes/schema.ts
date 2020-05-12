import Joi from '@hapi/joi';
import { JoiObjectId } from '../../../helpers/validator';

export default {
    create: Joi.object().keys({
        content: Joi.string().required().min(1).max(100),
    }),
    id: Joi.object().keys({
        id: JoiObjectId().required()
    }),
    update: Joi.object().keys({
        content: Joi.string().optional().min(1).max(100),
        done: Joi.boolean().optional(),
    }),
    search: Joi.object().keys({
        content: Joi.string().optional().min(1).max(50),
    })
};
