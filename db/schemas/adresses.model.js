import { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

ObjectId.prototype.valueOf = () => this.toString();

const locationModel = new Schema({
  street: { type: String },
  complement: { type: String },
  district: { type: String },
  city: { type: String },
  number: { type: String },
  zipcode: { type: String, required: true },
  state: { type: String },
  country: { type: String },
  geometry: { type: Object },
  place_id: { type: String },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  user: { type: ObjectId, ref: 'user' },
}, {
  usePushEach: true,
  timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' },
});

export default locationModel;
