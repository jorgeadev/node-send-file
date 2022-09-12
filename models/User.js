const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create user schema
const UserSchema = new Schema({
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

module.exports = mongoose.model('User', UserSchema);
