import mongoose from 'mongoose';

const NodeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, required: true },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  data: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String },
  },
}, { _id: false });

const EdgeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  source: { type: String, required: true },
  target: { type: String, required: true },
}, { _id: false });

const RoadmapSchema = new mongoose.Schema({
  roadmapTitle: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String },
  initialNodes: [NodeSchema],
  initialEdges: [EdgeSchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Roadmap || mongoose.model('Roadmap', RoadmapSchema);
