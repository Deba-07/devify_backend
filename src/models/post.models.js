import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  scheduledTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'published', 'failed'],
    default: 'scheduled'
  },
  publishedAt: {
    type: Date
  },
  recurrence: {
    type: String,
    enum: ['none', 'daily', 'weekly'],
    default: 'none'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

export const Post = mongoose.model('Post', postSchema);
