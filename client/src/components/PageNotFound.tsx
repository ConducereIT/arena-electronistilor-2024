import { useNavigate } from "react-router-dom";
import Button from "./Button";


function PageNotFound() {
  const navigate = useNavigate();

  const moveBack = function () {
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-violet-500 to-sky-500 p-12">
      <div className="bg-indigo-300 border-b-2 border-black rounded-md p-12 text-center max-w-4xl flex-grow shadow-lg">
        <h1 className="text-3xl font-semibold mb-8">
          The page you are looking for could not be found 😢
        </h1>
        <Button className="w-40" onClick={moveBack}>
          &larr; Go back
        </Button>
      </div>
    </div>
  );
}

export default PageNotFound;