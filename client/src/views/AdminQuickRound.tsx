import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminQuickRound = () => {
  const [rows, setRows] = useState([
    { text: "", score: 0, hidden: true },
    { text: "", score: 0, hidden: true },
    { text: "", score: 0, hidden: true },
    { text: "", score: 0, hidden: true },
    { text: "", score: 0, hidden: true },
  ]);
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTextChange = (index: number, value: string) => {
    const updatedRows = [...rows];
    updatedRows[index].text = value;
    setRows(updatedRows);
  };

  const handleScoreChange = (index: number, value: string) => {
    const updatedRows = [...rows];
    updatedRows[index].score = parseFloat(value) || 0;
    setRows(updatedRows);
  };

  const toggleVisibility = (index: number) => {
    const updatedRows = [...rows];
    updatedRows[index].hidden = !updatedRows[index].hidden;
    setRows(updatedRows);
  };

  const calculateTotal = () => {
    return rows.reduce((total, row) => (!row.hidden ? total + row.score : total), 0);
  };

  const handleAddTeam = async () => {
    if (teamName.trim() === "") {
      alert("Introduceți un nume pentru echipă!");
      return;
    }

    const totalScore = calculateTotal();
    const newTeam = { name: teamName, score: totalScore };

    try {
      setLoading(true);
      await axios.post(
        "https://88d118d7-e514-4be3-93a2-a6f3cd2137ee.eu-central-1.cloud.genez.io/api/teams/",
        newTeam,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJpdGxzZS5jb25kdWNlcmVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzIzMjE0ODA0fQ.2gPSXyFckNfVSv_FmqF4-v5QIrVtd5nb2CtjcTqDQe4`,
          },
        }
      );
      alert("Echipa a fost adăugată cu succes!");
      setTeamName("");
      setRows(rows.map((row) => ({ ...row, text: "", score: 0, hidden: true })));
    } catch (error: any) {
      if (error.response) {
        console.error("Eroare de la server:", error.response.data);
        alert(`Eroare: ${error.response.data.message || "Unauthorized"}`);
      } else {
        console.error("Eroare la salvarea echipei:", error);
        alert("A apărut o eroare la salvarea echipei. Te rugăm să încerci din nou.");
      }
    } finally {
      setLoading(false);
    }
  };

  const goToRanking = () => {
    navigate("/ranking");
  };

  return (
    <div className="bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 h-screen w-screen flex justify-center items-center font-poppins">
      <div className="w-[90vw] h-[90vh] rounded-xl p-10 bg-sky-100 shadow-2xl flex flex-col justify-between">
        <div className="flex flex-col gap-5">
          {rows.map((row, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 bg-sky-200 rounded-lg shadow-lg"
              style={{ fontSize: "2.5rem" }}
            >
              <input
                type="text"
                value={row.text}
                onChange={(e) => handleTextChange(index, e.target.value)}
                placeholder="Introdu răspunsul..."
                className="flex-1 max-w-[60%] p-3 rounded-md bg-sky-50 text-center text-3xl font-bold"
              />
              {row.hidden ? (
                <div
                  onClick={() => toggleVisibility(index)}
                  className="w-[100px] h-[60px] flex items-center justify-center rounded-md bg-sky-100 text-black cursor-pointer shadow-md"
                >
                  ?
                </div>
              ) : (
                <input
                  type="text"
                  inputMode="numeric"
                  value={row.score}
                  onChange={(e) => handleScoreChange(index, e.target.value)}
                  onBlur={() => toggleVisibility(index)}
                  className="w-[100px] h-[60px] rounded-md bg-sky-50 text-black text-center text-3xl font-bold"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center mt-5">
          <div className="flex justify-between w-full p-5 bg-blue-900 text-yellow-400 rounded-lg text-5xl font-bold">
            <span>TOTAL</span>
            <span>{calculateTotal()}</span>
          </div>

          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Introdu numele echipei..."
            className="w-full mt-5 p-5 rounded-lg border-2 border-gray-400 text-3xl"
          />

          <div className="flex w-full mt-5 gap-5">
            <button
              onClick={handleAddTeam}
              className="w-1/2 bg-green-600 text-white py-4 rounded-lg text-3xl font-bold"
              disabled={loading} // Dezactivăm butonul în timpul încărcării
            >
              {loading ? "Se salvează..." : "Adaugă echipa"}
            </button>
            <button
              onClick={goToRanking}
              className="w-1/2 bg-blue-900 text-white py-4 rounded-lg text-3xl font-bold"
            >
              Vezi clasamentul
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminQuickRound;
