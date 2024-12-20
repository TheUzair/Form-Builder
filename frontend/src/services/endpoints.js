import api from "./api";

// API Endpoints for Comprehension
export const fetchComprehensionQuestions = async () => {
  const response = await api.get("/comprehension");
  return response.data;
};

export const addComprehensionQuestion = async () => {
  const response = await api.post("/comprehension");
  return response.data;
};
export const saveComprehensionQuestionsBulk = async (questions) => {
  const response = await api.post("/comprehension/bulk-save", { questions });
  return response.data;
}

// API Endpoints for Cloze
export const fetchClozeQuestions = async () => {
  const response = await api.get("/cloze");
  return response.data;
};
export const addClozeQuestion = async () => {
  const response = await api.post("/cloze");
  return response.data;
};

export const saveClozeQuestionsBulk = async (questions) => {
  const response = await api.post("/cloze/bulk-save", { questions });
  return response.data;
};

// API Endpoints for Categorize
export const fetchCategorizeQuestions = async () => {
  const response = await api.get("/categorize");
  return response.data;
};
export const addCategorizeQuestion = async () => {
  const response = await api.post("/categorize");
  return response.data; 
};

export const saveCategorizeQuestionsBulk = async (questions) => {
  const response = await api.post("/categorize/bulk-save", { questions });
  return response.data;
};