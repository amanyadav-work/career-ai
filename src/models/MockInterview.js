import mongoose from 'mongoose';

const MockInterviewSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  jobRole: { 
    type: String, 
    required: true 
  },
  skills: { 
    type: [String], 
    required: true 
  },
  difficulty: { 
    type: String, 
    enum: ['Beginner', 'Intermediate', 'Advanced'], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'canceled'], 
    default: 'pending' 
  },
  notes: { 
    type: String 
  },
  conversation: [{
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

const MockInterview = mongoose.models.MockInterview || mongoose.model('MockInterview', MockInterviewSchema);

export default MockInterview;
