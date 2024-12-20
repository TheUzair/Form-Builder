import Comprehension from '../models/Comprehension.js';

// Get all Comprehension questions
export const getComprehensions = async (req, res) => {
  try {
    const comprehensions = await Comprehension.find();
    res.status(200).json(comprehensions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new Comprehension question
export const createComprehension = async (req, res) => {
  try {
    const newComprehension = new Comprehension(req.body);
    await newComprehension.save();
    res.status(201).json(newComprehension);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
