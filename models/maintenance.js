const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");

const ServiceType = {
  Electrical: "electrical",
  General: "general",
  PestControl: "pest-control",
  Plumbing: "plumbing",
};

const ALL_SERVICE_TYPES = [
  ServiceType.Electrical,
  ServiceType.General,
  ServiceType.PestControl,
  ServiceType.Plumbing,
];

const maintenanceSchema = new Schema({
  id: { type: String, unique: true, default: uuidv4 },
  name: { type: String, lowercase: true },
  email: { type: String, lowercase: true },
  unitNumber: Number,
  serviceType: { type: String, enum: ALL_SERVICE_TYPES },
  summary: String,
  details: String,
});

module.exports = mongoose.model("maintenance", maintenanceSchema);
