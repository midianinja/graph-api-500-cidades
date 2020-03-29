import { Schema } from 'mongoose';

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
}, {
  usePushEach: true,
  timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' },
});

export default locationModel;
