const mongoose = require('mongoose');
SALT_WORK_FACTOR = 10

// create a model

const UserSchema = new mongoose.Schema({
	agenid: 'string',
	name : { type : 'string'},
	nohp : { type : 'string', unique: true, required: true, trim: true},
	pin : { type : 'string', required: true },
	address : { type : 'string'},
	hrg_khs : { type: 'string' }
})

module.exports = mongoose.model('User', UserSchema);