import { Types } from 'mongoose';
import Note, { NoteModel } from '../model/Note';

export default class NoteRepo {
    public static remove(id: Types.ObjectId): Promise<Note> {
        return NoteModel.findByIdAndRemove(id).lean<Note>().exec();
    }

    public static findById(id: Types.ObjectId): Promise<Note> {
        return NoteModel
            .findById(id)
            .lean<Note>()
            .exec();
    }

    public static find(query: any): Promise<Note[]> {
        return NoteModel
            .find({ ...query })
            .lean<Note>()
            .exec();
    }

    public static async create(content: string, done: boolean)
        : Promise<Note> {
        const note = await NoteModel.create(<Note> {
            content,
            done
        });
        return note.toObject();
    }

    public static async update(id: Types.ObjectId, content: string, done: boolean)
        : Promise<Note> {
        const note = await NoteModel.findByIdAndUpdate(id, {content, done}, {new: true});
        return note.toObject();
    }
}
