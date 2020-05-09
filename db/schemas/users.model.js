import { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

ObjectId.prototype.valueOf = () => this.toString();

const fiveHundredCities = new Schema({
  tipology: { type: String, default: '' },
  name: { type: String, required: true },
  profile_image: {
    mimified: { type: String, default: '' },
    original: { type: String, default: '' },
    thumbnail: { type: String, default: '' },
  },
  cover_image: {
    mimified: { type: String, default: '' },
    original: { type: String, default: '' },
    thumbnail: { type: String, default: '' },
  },
  biography: { type: String, default: '' },
  skills: [{ type: String }],
  email: { type: String, required: true, unique: true },
  instagram: { type: String, default: '' },
  facebook: { type: String, default: '' },
  phone: { type: String, default: '' },
  job: { type: String, default: '' },
  site_address: { type: String, default: '' },
  search_keys: [{ type: String }],
  genre: { type: String, default: '' },
  sexual_orientation: { type: String, default: '' },
  race: { type: String, default: '' },
  address: { type: ObjectId, ref: 'adresses' },
}, {
  timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' },
});

export default fiveHundredCities;
