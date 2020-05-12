import {Types} from "mongoose";

export const NOTE_ID = new Types.ObjectId();

export const mockNoteCreate = jest.fn(async (title: string, markdown: string) => {
    return {
        title: title,
        markdown: markdown,
        createdAt: new Date(),
        updatedAt: new Date()
    };
});

export const mockNoteUpdate = jest.fn(async (id: Types.ObjectId, title: string, markdown: string) => {
    return {
        title: title,
        markdown: markdown,
        createdAt: new Date(),
        updatedAt: new Date()
    };
});

export const mockNoteFind = jest.fn(async (title: string, markdown: string) => {
    return [{}];
});

export const mockNoteFindById = jest.fn(async (id: Types.ObjectId) => {
    return id.equals(NOTE_ID) ? {
        title: 'ok',
        markdown: 'ok',
        createdAt: new Date(),
        updatedAt: new Date()
    } : undefined;
});

export const mockNoteRemove = jest.fn(async (id: Types.ObjectId) => {
    return {
        title: 'ok',
        markdown: 'ok',
        createdAt: new Date(),
        updatedAt: new Date()
    };
});

jest.mock('../../../../src/database/repository/NoteRepo', () => ({
    get create() { return mockNoteCreate; },
    get findById() { return mockNoteFindById; },
    get update() { return mockNoteUpdate; },
    get find() { return mockNoteFind; },
    get remove() { return mockNoteRemove; },
}));