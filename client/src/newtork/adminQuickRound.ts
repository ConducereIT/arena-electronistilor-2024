const url = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_JWT_TOKEN;

export const getQuestions = async () => {
  try {
    const response = await fetch(`${url}/api/questions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch questions:", error);
  }
};

export const deleteQuestion = async (id: number) => {
  try {
    const response = await fetch(`${url}/api/questions/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Failed to delete question:", error);
  }
};

interface Answers {
  [key: string]: number;
}

interface Question {
  question: string;
  answers: Answers;
}

export const createQuestion = async (question: Question) => {
  try {
    const response = await fetch(`${url}/api/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(question),
    });

    return await response.json();
  } catch (error) {
    console.error("Failed to create question:", error);
  }
};

export const updateQuestion = async (id: number, question: Question) => {
  try {
    const response = await fetch(`${url}/api/questions/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(question),
    });

    return await response.json();
  } catch (error) {
    console.error("Failed to update question", error);
  }
};
