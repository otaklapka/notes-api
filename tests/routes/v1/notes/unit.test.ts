import {mockNoteCreate, mockNoteFind, mockNoteFindById, mockNoteRemove, mockNoteUpdate} from "./mock";
import {apiKey} from "../../../../src/config";

import supertest = require("supertest");
import app from "../../../../src/app";
import {Types} from "mongoose";

describe('Notes', () => {
    const endpoint = '/api/v1/notes';
    const request = supertest(app);

    beforeEach(() => {
        mockNoteCreate.mockClear();
        mockNoteUpdate.mockClear();
        mockNoteRemove.mockClear();
        mockNoteFindById.mockClear();
        mockNoteFind.mockClear();
    });

    it('Should send error when empty body is sent', async () => {
        const response = await request.post(endpoint).set('x-api-key', apiKey);
        expect(response.status).toBe(400);
        expect(mockNoteCreate).not.toBeCalled();
    });

    it('Should send error when content exist', async () => {
        const response = await request.post(endpoint)
            .set('x-api-key', apiKey)
            .send({content: 'test'});

        expect(response.status).toBe(400);
        expect(mockNoteFind).toBeCalledTimes(1);
        expect(mockNoteCreate).not.toBeCalled();
    });

    it('Should not delete when id not exist', async () => {
        const response = await request.delete(`${endpoint}/${new Types.ObjectId()}`)
            .set('x-api-key', apiKey);

        expect(response.status).toBe(400);
        expect(mockNoteFindById).toBeCalledTimes(1);
        expect(mockNoteRemove).not.toBeCalled();
    });

    it('Should not update when id not exist', async () => {
        const response = await request.put(`${endpoint}/${new Types.ObjectId()}`)
            .set('x-api-key', apiKey);

        expect(response.status).toBe(400);
        expect(mockNoteFindById).toBeCalledTimes(1);
        expect(mockNoteUpdate).not.toBeCalled();
    });
});