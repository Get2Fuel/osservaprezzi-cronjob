import mongoose from "mongoose";

const pumpSchema = new mongoose.Schema({
  pumpId: Number,
  coordinates: {
    longitude: Number,
    latitude: Number,
  },
  region: String,
  province: String,
  town: String,
  address: String,
  zip: Number,
  name: String,
  brand: String,
  lastUpdate: Date,
  fuels: {},
});

export default pumpSchema;
