import { Document, model, Schema, Types } from 'mongoose';

export interface IUser extends Document {
    name: string;
    _id: Types.ObjectId;
    username: string;
    password: string;
    email: string;
    role: string;
    phone: string;
    status: boolean;
    createDate: Date;
    deleteDate: Date;
}


const userShema =  new Schema<IUser>({
    name: { type: String, required: true },
    _id: { type: Schema.Types.ObjectId, auto: true },
    //id: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: Boolean, default: false },
    createDate: { type: Date, default: Date.now() },
    deleteDate: { type: Date }
});


export const User = model<IUser>('User', userShema, 'users');
 