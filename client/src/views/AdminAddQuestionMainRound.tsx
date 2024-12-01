import React, { useState, useEffect } from "react";

export default function AdminAddQuestionMainRound() {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [currentScore, setCurrentScore] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [showAddQuestionForm, setShowAddQuestionForm] = useState(false); // Definire stare pentru formular

  const API_URL =
    "https://88d118d7-e514-4be3-93a2-a6f3cd2137ee.eu-central-1.cloud.genez.io/api/questions/";

  const handleAddAnswer = () => {
    if (currentAnswer.trim() && currentScore.trim() && !isNaN(currentScore)) {
      setAnswers([
        ...answers,
        { answer: currentAnswer, score: parseInt(currentScore, 10) },
      ]);
      setCurrentAnswer("");
      setCurrentScore("");
    } else {
      alert("Te rog să introduci un răspuns valid și un scor numeric.");
    }
  };

  const handleSave = async () => {
    if (!question.trim()) {
      alert("Te rog să introduci o întrebare.");
      return;
    }
    if (answers.length === 0) {
      alert("Te rog să adaugi cel puțin un răspuns.");
      return;
    }

    const data = { question, answers };

    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJpdGxzZS5jb25kdWNlcmVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzIzMjE0ODA0fQ.2gPSXyFckNfVSv_FmqF4-v5QIrVtd5nb2CtjcTqDQe4",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Eroare la trimiterea datelor către backend.");
      }

      const savedQuestion = await response.json();
      console.log("Întrebare salvată:", savedQuestion);

      setSuccessMessage("Întrebarea a fost salvată cu succes!");
      setQuestion("");
      setAnswers([]);
      fetchQuestions();
    } catch (error) {
      console.error(error);
      alert("A apărut o eroare. Te rugăm să încerci din nou.");
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestions = async () => {
    setLoadingQuestions(true);
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJpdGxzZS5jb25kdWNlcmVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzIzMjE0ODA0fQ.2gPSXyFckNfVSv_FmqF4-v5QIrVtd5nb2CtjcTqDQe4",
        },
      });

      if (!response.ok) {
        throw new Error("Eroare la obținerea întrebărilor.");
      }

      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error(error);
      alert("A apărut o eroare la încărcarea întrebărilor.");
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!window.confirm("Ești sigur că vrei să ștergi această întrebare?")) return;
  
    try {
      const response = await fetch(`${API_URL}${questionId}/`, { // Folosește backtick-uri aici
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJpdGxzZS5jb25kdWNlcmVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzIzMjE0ODA0fQ.2gPSXyFckNfVSv_FmqF4-v5QIrVtd5nb2CtjcTqDQe4",
        },
      });
  
      if (!response.ok) {
        throw new Error("Eroare la ștergerea întrebării.");
      }
  
      alert("Întrebarea a fost ștearsă cu succes.");
      fetchQuestions();
    } catch (error) {
      console.error("Eroare la ștergerea întrebării:", error);
      alert("A apărut o eroare. Te rugăm să încerci din nou.");
    }
  };
  
  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
  
      <div className="container mx-auto p-8">
  <h2 className="text-2xl font-semibold text-gray-700 mb-4">Întrebări existente</h2>
  {loadingQuestions ? (
    <p className="text-gray-500">Se încarcă...</p>
  ) : (
    <div className="space-y-4">
      {questions.map((q, index) => (
        <div
          key={index}
          className="p-4 bg-blue-50 shadow-md rounded-md border border-gray-300 flex justify-between items-center"
        >
          <div>
            <h3 className="text-lg font-bold text-blue-600 mb-2">{q.question}</h3>
            <ul className="pl-5 list-disc">
              {Array.isArray(q.answers) ? (
                q.answers.map((ans, i) => (
                  <li key={i} className="text-gray-700">
                    {ans.answer} - {ans.score} puncte
                  </li>
                ))
              ) : (
                <li className="text-gray-500">Nicio opțiune disponibilă</li>
              )}
            </ul>
          </div>
          <button
  className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-all"
  onClick={() => handleDeleteQuestion(q.id)}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
</button>




        </div>
      ))}
    </div>
  )}

  {/* Buton pentru a adăuga o nouă întrebare */}
  <div className="mt-4 text-center">
    <button
      onClick={() => setShowAddQuestionForm(true)}
      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
    >
      Adaugă o nouă întrebare
    </button>
  </div>

  {showAddQuestionForm && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="w-full max-w-lg p-6 bg-white rounded-xl shadow-xl transform transition-all duration-300 scale-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
       
        <button
          onClick={() => setShowAddQuestionForm(false)}
          className="text-gray-400 hover:text-gray-600 transition absolute top-5 right-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Întrebare */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Întrebare:
        </label>
        <input
          type="text"
          placeholder="Scrie întrebarea aici..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Răspunsuri */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Răspunsuri:</h4>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Răspuns"
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Scor"
            value={currentScore}
            onChange={(e) => setCurrentScore(e.target.value)}
            className="w-24 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={handleAddAnswer}
            className="bg-blue-500 text-white px-3 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
        <ul className="mt-3 list-disc pl-5 text-sm text-gray-700">
          {answers.map((item, index) => (
            <li key={index}>
              {item.answer} - {item.score} puncte
            </li>
          ))}
        </ul>
      </div>

      {/* Butoane Salvare/Anulare */}
      <div className="flex justify-end gap-4">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-5 py-2 rounded-lg shadow hover:bg-green-600 transition-all"
        >
          Salvează
        </button>
        <button
          onClick={() => setShowAddQuestionForm(false)}
          className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg shadow hover:bg-gray-200 transition-all"
        >
          Anulează
        </button>
      </div>
    </div>
  </div>
)}


</div>


  );
}
