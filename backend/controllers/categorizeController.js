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

export const bulkSaveCategorizes = async (req, res) => {
  try {
    const { questions } = req.body;
    
    if (!questions || !Array.isArray(questions)) {
      return res.status(400).json({ 
        error: "Invalid request format. Expected an array of questions." 
      });
    }

    console.log("Received payload:", questions);

    // Validate each question
    questions.forEach((question, index) => {
      if (!question.questionNumber || !question.type || !question.points) {
        throw new Error(`Invalid question data at index ${index}`);
      }
    });

    // Insert all questions
    const savedQuestions = await Categorize.insertMany(questions);
    
    res.status(200).json({ 
      message: "Questions saved successfully",
      count: savedQuestions.length,
      questions: savedQuestions
    });
  } catch (error) {
    console.error("Error saving questions:", error);
    res.status(500).json({ 
      error: `Failed to save questions: ${error.message}`,
      details: error.errors || undefined
    });
  }
};