import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import MainRound from "./views/MainRound";
import QuickRound from "./views/QuickRound";
import ScoreDisplay from "./views/ScoreDisplay";
import Ranking from "./views/Ranking";
import AdminAddTeam from "./views/AdminAddTeam";
import AdminQuickRound from "./views/AdminQuickRound";
import AdminAddQuestionMainRound from "./views/AdminAddQuestionMainRound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import Spinner from "./components/Spinner";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/mainround" element={<MainRound />} />
            <Route path="/quickround" element={<QuickRound />} />
            <Route path="/scoredisplay" element={<ScoreDisplay />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/admin/addTeam" element={<AdminAddTeam />} />
            <Route path="/admin/quickround" element={<AdminQuickRound />} />
            <Route
              path="/admin/addquestionmainround"
              element={<AdminAddQuestionMainRound />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
