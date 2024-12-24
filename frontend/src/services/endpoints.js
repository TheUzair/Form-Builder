import api from "./api";

// API Endpoints for Categorize
export const fetchCategorizeQuestions = async () => {
  const response = await api.get("/categorize");
  return response.data;
};
export const addCategorizeQuestion = async (questionData) => {
  console.log(questionData);
  
  const response = await api.post("/categorize", questionData);
  return response.data; 
};

export const saveCategorizeQuestionsBulk = async (questions) => {
  const response = await api.post("/categorize/bulk-save", { questions });
  return response.data;
};

// API Endpoints for Cloze
export const fetchClozeQuestions = async () => {
  const response = await api.get("/cloze");
  return response.data;
};
export const addClozeQuestion = async (data) => {
  try {
    // Log the data being sent
    console.log('Sending to API:', data);

    const response = await api.post("/cloze", {
      ...data,
      // Ensure these are explicitly set
      sentence: data.sentence,
      type: 'cloze',
      questionNumber: Number(data.questionNumber)
    });

    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Cloze Question Error:', {
      error,
      data: error.response?.data,
      status: error.response?.status
    });
    throw error.response?.data || error;
  }
};

export const saveClozeQuestionsBulk = async (questions) => {
  try {
    console.log('Sending questions to backend:', questions);
    const response = await api.post("/cloze/bulk-save", { questions });
    return response.data;
  } catch (error) {
    console.error('Bulk save error:', error);
    throw error.response?.data || error;
  }
};

// API Endpoints for Comprehension
export const fetchComprehensionQuestions = async () => {
  const response = await api.get("/comprehension");
  return response.data;
};

// In your endpoints.js file
export const addComprehensionQuestion = async (data) => {
  try {
    console.log('Sending to API:', data);
    const response = await api.post("/comprehension", data);
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const saveComprehensionQuestionsBulk = async (questions) => {
  const response = await api.post("/comprehension/bulk-save", { questions });
  return response.data;
}


