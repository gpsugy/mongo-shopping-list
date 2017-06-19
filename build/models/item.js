import mongoose from 'mongoose';

let ItemSchema = new mongoose.Schema({
	name: { type: String, required: true }
});

let Item = mongoose.model('Item', ItemSchema);

export { Item };