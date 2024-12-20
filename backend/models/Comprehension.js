import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
  id: Number,
  text: String,
  isCorrect: Boolean
});

const subQuestionSchema = new mongoose.Schema({
  id: Number,
  title: String,
  type: {
    type: String,
    enum: ['mcq', 'mca'],
  },
  points: Number,
  negativePoints: Number,
  options: [optionSchema],
  selectedOption: String
});

const comprehensionSchema = new mongoose.Schema({
  questionNumber: Number,
  type: {
    type: String,
    default: 'comprehension',
    required: true
  },
  points: Number,
  negativePoints: Number,
  description: String,
  passage: {
    type: String,
    required: true
  },
  subQuestions: [subQuestionSchema]
});

export default mongoose.model('Comprehension', comprehensionSchema);
