import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

const UserSchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	}
});

export default mongoose.model<IUser>("User", UserSchema);
