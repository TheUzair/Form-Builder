import Cloze from '../models/Cloze.js';

// Get all Cloze questions
export const getClozes = async (req, res) => {
  try {
    const clozes = await Cloze.find();
    res.status(200).json(clozes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new Cloze question
export const createCloze = async (req, res) => {
  try {
    const newCloze = new Cloze(req.body);
    await newCloze.save();
    res.status(201).json(newCloze);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const bulkSaveClozes = async (req, res) => {
  const { questions } = req.body;

  try {
    console.log("Received payload:", questions);

    // Insert all questions
    await Cloze.insertMany(questions);
    res.status(200).json({ message: "Questions saved successfully" });
  } catch (error) {
    console.error("Error saving questions:", error.message, error.errors || "");
    res.status(500).json({ error: `Failed to save questions: ${error.message}` });
  }
};
