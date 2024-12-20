import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  id: Number,
  name: String
});

const itemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  category: String
});

const categorizeSchema = new mongoose.Schema({
  questionNumber: Number,
  type: {
    type: String,
    default: 'categorize',
    required: true
  },
  points: Number,
  negativePoints: Number,
  description: String,
  categories: [categorySchema],
  items: [itemSchema]
});

export default mongoose.model('Categorize', categorizeSchema);
