import Categorize from '../models/Categorize.js';

// Get all Categorize questions
export const getCategorizes = async (req, res) => {
  try {
    const categorizes = await Categorize.find();
    res.status(200).json(categorizes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new Categorize question
export const createCategorize = async (req, res) => {
  try {
    const newCategorize = new Categorize(req.body);
    await newCategorize.save();
    res.status(201).json(newCategorize);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
