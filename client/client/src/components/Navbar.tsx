import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className=" bg-gradient-to-t from-indigo-700 to-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">Arena Electronistilor</Link>
        </div>
        <div className="space-x-4">
          <Link to="/login" className="hover:text-gray-300 duration-300">
            Login
          </Link>
          <Link to="/register" className="hover:text-gray-300 duration-300">
            Register
          </Link>
          <Link to="/mainround" className="hover:text-gray-300 duration-300">
            Main Round
          </Link>
          <Link to="/quickround" className="hover:text-gray-300 duration-300">
            Quick Round
          </Link>
          <Link to="/scoredisplay" className="hover:text-gray-300 duration-300">
            Score Display
          </Link>
          <Link to="/ranking" className="hover:text-gray-300 duration-300">
            Ranking
          </Link>
          <Link
            to="/admin/addTeam"
            className="hover:text-gray-300 duration-300"
          >
            Admin Add Team
          </Link>
          <Link
            to="/admin/quickround"
            className="hover:text-gray-300 duration-300"
          >
            Admin Quick Round
          </Link>
          <Link
            to="/admin/addquestionmainround"
            className="hover:text-gray-300 duration-300"
          >
            Admin Add Question
          </Link>
        </div>
      </div>
    </nav>
  );
}
