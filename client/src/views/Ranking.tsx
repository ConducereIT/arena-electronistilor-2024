import { useEffect, useState } from "react";
import axios from "axios";

interface Team {
  id: number;
  name: string;
  score: number;
}

const Ranking = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://88d118d7-e514-4be3-93a2-a6f3cd2137ee.eu-central-1.cloud.genez.io/api/teams/",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJpdGxzZS5jb25kdWNlcmVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzIzMjE0ODA0fQ.2gPSXyFckNfVSv_FmqF4-v5QIrVtd5nb2CtjcTqDQe4`,
            },
          }
        );
        setTeams(response.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          // Gestionăm erorile venite de la Axios
          console.error("Eroare de la server:", error.response?.data);
          alert(`Eroare: ${error.response?.data?.message || "Unauthorized"}`);
        } else {
          // Gestionăm alte tipuri de erori
          console.error("Eroare la încărcarea echipelor:", error);
          alert("A apărut o eroare. Te rugăm să încerci din nou.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-[900px] bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-5">Clasament</h2>
        {loading ? (
          <p className="text-gray-500 text-center">Se încarcă...</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="p-3">Poziție</th>
                <th className="p-3">Echipă</th>
                <th className="p-3">Punctaj</th>
              </tr>
            </thead>
            <tbody>
              {teams
                .sort((a, b) => b.score - a.score)
                .map((team, index) => (
                  <tr
                    key={team.id}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
                  >
                    <td className="p-3 text-center">{index + 1}</td>
                    <td className="p-3 text-center">{team.name}</td>
                    <td className="p-3 text-center">{team.score}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Ranking;
