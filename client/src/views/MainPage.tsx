import { Link } from "react-router-dom";

export default function MainRound() {
    return (
        <div className="bg-gradient-to-br from-blue-100 to-sky-300 min-h-screen flex flex-col items-center py-10">
            {/* Titlul principal */}
            <h1 className="text-3xl font-extrabold text-gray-700 mb-10 text-center">
                Arena Electroniștilor 
            </h1>

            {/* Secțiuni */}
            <div className="flex flex-wrap justify-center gap-10 w-3/4">
                {/* Secțiunea Jocul */}
                <div className="bg-white shadow-md rounded-lg p-6 w-full sm:w-5/12">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">Jocul</h2>
                    <div className="flex flex-col gap-4">
                        <Link
                            to="/semifinala1"
                            className="p-4 bg-blue-500 text-white font-bold text-lg rounded-lg hover:bg-blue-600 shadow-md text-center"
                        >
                            Semifinala 1
                        </Link>
                        <Link
                            to="/semifinala2"
                            className="p-4 bg-blue-500 text-white font-bold text-lg rounded-lg hover:bg-blue-600 shadow-md text-center"
                        >
                            Semifinala 2
                        </Link>
                        <Link
                            to="/finala"
                            className="p-4 bg-blue-500 text-white font-bold text-lg rounded-lg hover:bg-blue-600 shadow-md text-center"
                        >
                            Finala
                        </Link>
                        <Link
                            to="/quickround"
                            className="p-4 bg-blue-500 text-white font-bold text-lg rounded-lg hover:bg-blue-600 shadow-md text-center"
                        >
                            Timer QuickRound
                        </Link>
                    </div>
                </div>

                {/* Secțiunea Admin */}
                <div className="bg-white shadow-md rounded-lg p-6 w-full sm:w-5/12">
                    <h2 className="text-2xl font-semibold text-red-600 mb-6 text-center">Admin</h2>
                    <div className="flex flex-col gap-4">
                        <Link
                            to="/admin/quickround"
                            className="p-4 bg-red-500 text-white font-bold text-lg rounded-lg hover:bg-red-600 shadow-md text-center"
                        >
                            Răspunsuri QuickRound
                        </Link>
                        <Link
                            to="/setquestions"
                            className="p-4 bg-red-500 text-white font-bold text-lg rounded-lg hover:bg-red-600 shadow-md text-center"
                        >
                            Set Questions SF/F
                        </Link>
                        <Link
                            to="/admin/addquestionmainround"
                            className="p-4 bg-red-500 text-white font-bold text-lg rounded-lg hover:bg-red-600 shadow-md text-center"
                        >
                            Adaugă Întrebări
                        </Link>
                        <Link
                            to="/admin/addTeam"
                            className="p-4 bg-red-500 text-white font-bold text-lg rounded-lg hover:bg-red-600 shadow-md text-center"
                        >
                            Echipe
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
