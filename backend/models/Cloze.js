import mongoose from 'mongoose';

const clozeSchema = new mongoose.Schema({
  questionNumber: Number,
  type: {
    type: String,
    default: 'cloze',
    required: true
  },
  points: Number,
  negativePoints: Number,
  description: String,
  sentence: {
    type: String,
    required: true
  },
  underlinedWords: {
    type: [String],
    required: true
  },
  options: [String]
});

export default mongoose.model('Cloze', clozeSchema);
