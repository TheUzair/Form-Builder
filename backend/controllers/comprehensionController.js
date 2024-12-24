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

export const bulkSaveComprehensions = async (req, res) => {
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
    const savedQuestions = await Comprehension.insertMany(questions);
    
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