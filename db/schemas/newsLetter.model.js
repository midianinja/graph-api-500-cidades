import { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

ObjectId.prototype.valueOf = () => this.toString();

const newsLetter = new Schema({
  email: { type: String, required: true, unique: true },
}, {
  timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' },
});

export default newsLetter;
