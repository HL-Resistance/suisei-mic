// Packages
const mongoose = require('mongoose');

// Schema
const muteSchema = new mongoose.Schema({
	_id: Number,
	expireAt: { type: Date, required: true },
	leftAt: Date,
	userId: { type: String, required: true },
	hardMute: { type: Boolean, default: false },
	roles: [String],
});

// muteSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Mute', muteSchema, 'activeMutes');
