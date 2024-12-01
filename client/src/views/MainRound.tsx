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
  const [timeLeft, setTimeLeft] = useState(20);
  const [isPaused, setIsPaused] = useState(true);
  const [idsf, setIdsf] = useState<string[]>([]);
  const [showMessage, setShowMessage] = useState(false); // Controlăm afișarea mesajului
  const [increment, setIncrement] = useState(0); // Incrementor pentru "X"-uri

  const audio = new Audio("/sounds/X.mp3");

  // Încarcă ID-urile salvate din localStorage
  useEffect(() => {
    const loadIdsf = () => {
      const savedIdsf = JSON.parse(localStorage.getItem("idsf") ?? "[]");
      setIdsf(savedIdsf);
    };
    loadIdsf();
  }, []);

  // Gestionează evenimentele de tastatură
  useEffect(() => {
    audio.load();
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
  }, [increment]);

  // Încarcă întrebările
  useEffect(() => {
    const fetchQuestions = async () => {
      const headers = {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJpdGxzZS5jb25kdWNlcmVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzIzMjE0ODA0fQ.2gPSXyFckNfVSv_FmqF4-v5QIrVtd5nb2CtjcTqDQe4",
      };

      try {
        const response = await fetch(
          "https://88d118d7-e514-4be3-93a2-a6f3cd2137ee.eu-central-1.cloud.genez.io/api/questions/",
          { headers }
        );
        const data = await response.json();

        const validatedData: Question[] = Array.isArray(data)
          ? data.map((q) => ({
              id: q.id,
              question: q.question,
              answers: q.answers || [], // Asigură-te că răspunsurile sunt un array
            }))
          : [];
        setQuestions(validatedData);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  // Setează indexul valid la primul element
  useEffect(() => {
    if (questions.length > 0 && idsf.length > 0) {
      const firstValidIndex = skipInvalidQuestions(0);
      setCurrentIndex(firstValidIndex);
    }
  }, [questions, idsf]);

  const skipInvalidQuestions = (index: number): number => {
    while (index < questions.length) {
      if (!idsf.includes(String(questions[index]?.id))) {
        break;
      }
      index++;
    }
    return index;
  };

  // Gestionează evenimentele de navigare și răspuns
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setCurrentIndex((prevIndex) => {
          const nextIndex = skipInvalidQuestions(prevIndex + 1);
          setRevealedAnswers([]);
          setTimeLeft(20);
          setIsPaused(true);
          setIncrement(0);
  
          return Math.min(nextIndex, questions.length - 1);
        });
      } else if (event.key === "ArrowLeft") {
        setCurrentIndex((prevIndex) => {
          let newIndex = prevIndex - 1;
          while (newIndex >= 0 && idsf.includes(String(questions[newIndex]?.id))) {
            newIndex--;
          }
          setRevealedAnswers([]);
          setTimeLeft(20);
          setIsPaused(true);
          setIncrement(0);
  
          return Math.max(newIndex, 0);
        });
      } else if (!isNaN(Number(event.key))) {
        const index = parseInt(event.key, 10) - 1;
        if (
          index >= 0 &&
          index < questions[currentIndex]?.answers.length // Verificăm lungimea array-ului de răspunsuri
        ) {
          setRevealedAnswers((prev) => [...new Set([...prev, index])]);
          setTimeLeft(20);
          setIsPaused(true);
        }
      } else if (event.ctrlKey && event.key === "Control") {
        setTimeLeft(4);
        setIsPaused(false);
      } else if (event.key === "p" || event.key === "P") {
        setIsPaused((prev) => !prev); // Comută între pauză și start
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
  
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [questions, currentIndex, idsf]);

  // Timer pentru întrebări
  useEffect(() => {
    let timer: number;
    if (!isPaused && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIncrement((prev) => Math.min(prev + 1, 3));
      setShowMessage(true); // Afișăm mesajul
      setTimeout(() => setShowMessage(false), 2000); // Ascundem mesajul după 2 secunde
      setTimeLeft(20); // Resetăm timpul
      setIsPaused(true);
      audio.currentTime = 0;
      audio.play(); // Redă sunetul
    }

    return () => {
      window.clearInterval(timer);
    };
  }, [timeLeft, isPaused]);

  return (
    <div className="bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 min-h-screen flex flex-column justify-center relative">
      <div className="absolute top-4 right-4 p-4 bg-sky-200 text-sky-900 font-bold text-lg rounded-lg shadow-lg">
        {`Time Left: ${timeLeft}s`}
      </div>
      <div className="pt-[20px] w-screen max-w-fit">
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

        <div className="grid grid-cols-2 gap-4 mt-8 text-center flex justify-center items-center">
          {Array.isArray(questions) && questions.length > 0 ? (
            questions[currentIndex]?.answers.map((answer, index) => (
              <div
                key={index}
                className="w-120 h-24 flex justify-center items-center text-center text-sky-50 shadow-lg font-mono text-3xl p-4 border-4 border-sky-200 rounded-lg bg-blue-500"
              >
                <p>
                  {revealedAnswers.includes(index)
                    ? `${answer.answer} ${answer.score}` // Afișăm atât textul răspunsului cât și scorul
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
