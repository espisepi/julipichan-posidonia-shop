import mongoose, { Schema, model, Model } from 'mongoose';
import { IUser } from '@/features/next-teslo';

const userSchema = new Schema<IUser>({

    name    : { type: String, required: true },
    email   : { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: {
            values: ['admin','client', 'super-user','SEO'],
            message: '{VALUE} no es un role válido',
        },
        default: 'client',
        required: true
    }
}, {
    timestamps: true,
})

const User:Model<IUser> = mongoose.models?.User || model('User',userSchema);

export default User;