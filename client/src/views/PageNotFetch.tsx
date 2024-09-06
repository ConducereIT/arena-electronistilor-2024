import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function PageNotFetch({ error = "The page is not fetching" }) {
  const navigate = useNavigate();

  const moveBack = function () {
    navigate(-1);
  };

  return (
    <main className="h-screen bg-gray-50 flex items-center justify-center p-12">
      <div className="bg-gray-50 border border-gray-100 rounded-md p-12 flex-shrink-0 flex-grow-0 flex-basis-[96rem] text-center">
        <h1 className="text-4xl font-semibold"> {error} 😢</h1>
        <Button onClick={moveBack}> Please retry</Button>
      </div>
    </main>
  );
}
