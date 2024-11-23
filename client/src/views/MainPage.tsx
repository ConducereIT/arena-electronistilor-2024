
import { Link } from "react-router-dom";

export default function MainRound() {

    return (
        <>
        <body className="bg-sky-100 min-h-screen flex flex-row justify-center">
        <div className="flex flex-row items-center">
        <Link
            to="/semifinala1" className="mx-4 top-4 right-4 p-4 bg-blue-500 text-sky-100 font-bold text-lg rounded-lg shadow-lg">
        SemiFinala 1
        </Link>
        <Link
            to="/semifinala2" className="mx-4 top-4 right-4 p-4 bg-blue-500 text-sky-100 font-bold text-lg rounded-lg shadow-lg">
        SemiFinala 2
        </Link>
        <Link
            to="/finala" className="mx-4 top-4 right-4 p-4 bg-blue-500 text-sky-100 font-bold text-lg rounded-lg shadow-lg">
        Finala
        </Link>
        </div>
        </body>
        </>
    );  
}