const url = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_JWT_TOKEN;

export const getQuestions = async () => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

export const deleteQuestion = async (id: number) => {
  const response = await fetch(`${url}/${id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

interface Answers {
  [key: string]: number;
}

interface Question {
  question: string;
  answers: Answers;
}

export const createQuestion = async (question: Question) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(question),
  });

  return await response.json();
};

export const updateQuestion = async (id: number, question: Question) => {
  const response = await fetch(`${url}/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(question),
  });

  return await response.json();
};
