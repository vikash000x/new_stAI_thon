import mongoose from "mongoose";

const ExtractedSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  externalLink: {
    type: String
  }
});

const ClientIntelSchema = new mongoose.Schema({
  client: {
    type: String,
    required: true
  },
  serviceType: {               // 🔥 NEW FIELD
    type: String,
    required: true            // optional: set to true if user must always provide it
  },
  extracted: {
    type: [ExtractedSchema],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Updatedsch = mongoose.model('Updatedsch', ClientIntelSchema);

export default Updatedsch;
