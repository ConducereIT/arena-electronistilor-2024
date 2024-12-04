import { useState, useEffect } from "react";

interface Team {
  id: number;
  name: string;
  score: number;
}

export default function AdminManageTeams() {
  const [teamName, setTeamName] = useState("");
  const [teamScore, setTeamScore] = useState<string>("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [loadingTeams, setLoadingTeams] = useState(false);
  const [showAddTeamForm, setShowAddTeamForm] = useState(false);

  const API_URL =
    "https://88d118d7-e514-4be3-93a2-a6f3cd2137ee.eu-central-1.cloud.genez.io/api/teams/";

  const handleAddTeam = async () => {
    if (!teamName.trim()) {
      alert("Te rog să introduci un nume pentru echipă.");
      return;
    }
    if (!teamScore.trim() || isNaN(Number(teamScore))) {
      alert("Te rog să introduci un scor numeric valid.");
      return;
    }

    const data = { name: teamName, score: parseInt(teamScore, 10) };

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJpdGxzZS5jb25kdWNlcmVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzIzMjE0ODA0fQ.2gPSXyFckNfVSv_FmqF4-v5QIrVtd5nb2CtjcTqDQe4",
        },
        body: JSON.stringify(data),
      });
      alert("Echipa a fost adăugată cu succes!");
      setTeamName("");
      setTeamScore("");
      fetchTeams();
    } catch (error) {
      console.error("Eroare la adăugarea echipei:", error);
      alert("A apărut o eroare. Te rugăm să încerci din nou.");
    }
  };

  const fetchTeams = async () => {
    setLoadingTeams(true);
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
        throw new Error("Eroare la obținerea echipelor.");
      }

      const data: Team[] = await response.json();
      setTeams(data);
    } catch (error) {
      console.error("Eroare la încărcarea echipelor:", error);
      alert("A apărut o eroare la încărcarea echipelor.");
    } finally {
      setLoadingTeams(false);
    }
  };

  const handleDeleteTeam = async (teamId: number) => {
    if (!window.confirm("Ești sigur că vrei să ștergi această echipă?")) return;

    try {
      await fetch(`${API_URL}${teamId}/`, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJpdGxzZS5jb25kdWNlcmVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzIzMjE0ODA0fQ.2gPSXyFckNfVSv_FmqF4-v5QIrVtd5nb2CtjcTqDQe4",
        },
      });

      alert("Echipa a fost ștearsă cu succes.");
      fetchTeams();
    } catch (error) {
      console.error("Eroare la ștergerea echipei:", error);
      alert("A apărut o eroare. Te rugăm să încerci din nou.");
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Echipe existente</h2>
      {loadingTeams ? (
        <p className="text-gray-500">Se încarcă...</p>
      ) : (
        <div className="space-y-4">
          {teams.map((team) => (
            <div
              key={team.id}
              className="p-4 bg-blue-50 shadow-md rounded-md border border-gray-300 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-bold text-blue-600 mb-2">
                  {team.name} <span className="text-gray-500 text-sm">(ID: {team.id})</span>
                </h3>
                <p className="text-gray-700">Scor: {team.score}</p>
              </div>
              <button
                className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-all"
                onClick={() => handleDeleteTeam(team.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 text-center">
        <button
          onClick={() => setShowAddTeamForm(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Adaugă o echipă nouă
        </button>
      </div>

      {showAddTeamForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="w-full max-w-lg p-6 bg-white rounded-xl shadow-xl">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nume echipă:
              </label>
              <input
                type="text"
                placeholder="Nume echipă..."
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Scor:</label>
              <input
                type="number"
                placeholder="Scor..."
                value={teamScore}
                onChange={(e) => setTeamScore(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleAddTeam}
                className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600"
              >
                Salvează
              </button>
              <button
                onClick={() => setShowAddTeamForm(false)}
                className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-200"
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
