import { useEffect, useState } from "react";

interface Question {
  id: string;
  question: string;
  answers: { answer: string; score: number }[]; // Modificat pentru a fi array de obiecte
}

export default function MainRound() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedAnswers, setRevealedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPaused, setIsPaused] = useState(true);
  const [idsf, setIdsf] = useState<string[]>([]);
  const [showMessage, setShowMessage] = useState(false); // Controlăm afișarea mesajului
  const [increment, setIncrement] = useState(0); // Incrementor pentru "X"-uri
  const audio = new Audio("/sounds/X.mp3");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "x") {
        setIncrement((prev) => Math.min(prev + 1, 3)); // Incrementăm până la 3
        setShowMessage(true); // Afișăm mesajul
        audio.currentTime = 0; // Resetează sunetul la început
        audio.play(); // Redă sunetul
  
        if (increment === 0) {
          // Afișăm mesajul pentru un singur "X"
          console.log("Afișează un singur X"); // Poți înlocui cu logica de afișare efectivă
        }
  
        setTimeout(() => setShowMessage(false), 2000); // Ascundem mesajul după 2 secunde
      }
      if (event.key.toLowerCase() === "r") {
        setIncrement(0); // Resetăm incrementorul
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
  
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [increment]); // Adăugăm `increment` ca dependență
  


  // Încarcă ID-urile salvate din localStorage
  useEffect(() => {
    const loadIdsf = () => {
      const savedIdsf = JSON.parse(localStorage.getItem("idsf") ?? "[]");
      setIdsf(savedIdsf.slice(0, 5)); // Selectează doar primele 5 ID-uri
    };
    loadIdsf();
  }, []);

  // Fetch pentru întrebări folosind un rate-limit
  useEffect(() => {
    const fetchQuestionsWithRateLimit = async () => {
      const headers = {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJpdGxzZS5jb25kdWNlcmVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzIzMjE0ODA0fQ.2gPSXyFckNfVSv_FmqF4-v5QIrVtd5nb2CtjcTqDQe4",
      };
  
      const newQuestions: Question[] = [];
  
      for (const id of idsf) {
        try {
          const response = await fetch(
            `https://88d118d7-e514-4be3-93a2-a6f3cd2137ee.eu-central-1.cloud.genez.io/api/questions/${id}`,
            { headers }
          );
  
          if (response.ok) {
            const data = await response.json();
            newQuestions.push({
              id: data.id,
              question: data.question,
              answers: data.answers || [], // Răspunsurile vor fi un array de obiecte
            });
          } else {
            console.error(`Failed to fetch question with ID: ${id}`);
          }
  
          // Așteaptă 500 ms între cereri pentru a limita încărcarea serverului
          await new Promise((resolve) => setTimeout(resolve, 500));
        } catch (error) {
          console.error(`Error fetching question with ID: ${id}`, error);
        }
      }
  
      setQuestions(newQuestions);
    };
  
    if (idsf.length > 0) {
      fetchQuestionsWithRateLimit();
    }
  }, [idsf]);

  // Setează primul index valid la inițializarea componentului
  useEffect(() => {
    if (questions.length > 0) {
      setCurrentIndex(0);
    }
  }, [questions]);

  // Evenimente de tastatură
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setCurrentIndex((prevIndex) =>
          Math.min(prevIndex + 1, questions.length - 1)
        );
        setRevealedAnswers([]);
        setTimeLeft(30);
        setIsPaused(true);
        setIncrement(0);
      } else if (event.key === "ArrowLeft") {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        setRevealedAnswers([]);
        setTimeLeft(30);
        setIsPaused(true);
        setIncrement(0);
      } else if (!isNaN(Number(event.key))) {
        const index = parseInt(event.key, 10) - 1;
        if (
          index >= 0 &&
          index < Object.keys(questions[currentIndex]?.answers || {}).length
        ) {
          setRevealedAnswers((prev) => [...new Set([...prev, index])]);
          setTimeLeft(30);
        setIsPaused(false);
        }
      } else if (event.ctrlKey && event.key === "Control") {
        setTimeLeft(30);
        setIsPaused(false);
      }else if (event.key === "p" || event.key === "P") {
        setIsPaused((prev) => !prev); // Comută între pauză și start
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [questions, currentIndex]);

  // Timer pentru întrebări
  useEffect(() => {
    let timer: number;

    if (!isPaused && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }else if (timeLeft === 0) {
        // Incrementăm la expirarea timpului
        setIncrement((prev) => Math.min(prev + 1, 3));
        setShowMessage(true); // Afișăm mesajul
        setTimeout(() => setShowMessage(false), 2000); // Ascundem mesajul după 2 secunde
        setTimeLeft(30); // Resetăm timpul
        setIsPaused(true);
        audio.currentTime = 0; // Resetează sunetul la început
        audio.play(); // Redă sunetul
      }

    return () => {
      window.clearInterval(timer);
    };
  }, [timeLeft, isPaused]);

  return (
    <div className="bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 min-h-screen flex flex-column justify-center">
      <div className="absolute top-4 right-4 p-4 bg-sky-200 text-sky-900 font-bold text-lg rounded-lg shadow-lg">
        {`Time Left: ${timeLeft}s`}
      </div>
      <div className="pt-[40px] w-screen max-w-fit">
        <div className="w-[1000px] h-40 bg-blue-500 border border-sky-200 rounded-lg p-4 shadow-lg flex items-center justify-center">
          <p className="text-sky-50 font-mono text-5xl">
            {Array.isArray(questions) && questions.length > 0 ? (
              <p>{questions[currentIndex]?.question}</p>
            ) : (
              <p>Loading...</p>
            )}
          </p>
        </div>

        <div className="">
  {showMessage && increment === 1 && (
    <div className="absolute ml-[300px] text-red-500 font-bold text-[200px]">X</div>
  )}
  {showMessage && increment === 2 && (
    <div className="absolute ml-[300px] text-red-500 font-bold text-[200px]">XX</div>
  )}
  {showMessage && increment === 3 && (
    <div className="absolute ml-[300px] text-red-500 font-bold text-[200px]">XXX</div>
  )}
</div>

        <div className="grid grid-cols-2 gap-8 mt-8 text-center justify-center items-center">
  {Array.isArray(questions) && questions.length > 0 ? (
    questions[currentIndex]?.answers.map((item, index) => (
      <div
        key={index}
        className="w-120 h-24 flex justify-center items-center text-center text-sky-50 shadow-lg font-mono text-3xl p-4 border-4 border-sky-200 rounded-lg bg-blue-500"
      >
        <p>
          {revealedAnswers.includes(index)
            ? `${item.answer} ${item.score}`  // Afișează răspunsul și scorul
            : `${index + 1}`}
        </p>
      </div>
    ))
  ) : (
    <p>Loading answers...</p>
  )}
</div>
      </div>
    </div>
  );
}
