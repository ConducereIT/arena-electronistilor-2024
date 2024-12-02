import { Link } from "react-router-dom";

export default function MainRound() {
    return (
        <>
            <body className="bg-sky-100 min-h-screen flex flex-wrap justify-center items-center">

                <div className="flex flex-col w-1/2 items-center">
                <h1 className="text-xl font-bold mb-4">Jocul</h1>
                    <Link
                        to="/semifinala1"
                        className="mx-4 mb-4 p-4 bg-blue-500 text-sky-100 font-bold text-lg rounded-lg shadow-lg"
                    >
                        SemiFinala 1
                    </Link>
                    <Link
                        to="/semifinala2"
                        className="mx-4 mb-4 p-4 bg-blue-500 text-sky-100 font-bold text-lg rounded-lg shadow-lg"
                    >
                        SemiFinala 2
                    </Link>
                    <Link
                        to="/finala"
                        className="mx-4 mb-4 p-4 bg-blue-500 text-sky-100 font-bold text-lg rounded-lg shadow-lg"
                    >
                        Finala
                    </Link>
                    <Link
                        to="/quickround"
                        className="mx-4 mb-4 p-4 bg-blue-500 text-sky-100 font-bold text-lg rounded-lg shadow-lg"
                    >
                        QuickRound
                    </Link>
                </div>

                <div className="flex flex-col w-1/2 items-center">
                    <h1 className="text-xl font-bold mb-4">Admin</h1>
                    <Link
                        to="/admin/quickround"
                        className="mx-4 mb-4 p-4 bg-blue-500 text-sky-100 font-bold text-lg rounded-lg shadow-lg"
                    >
                        QuickRound
                    </Link>
                    <Link
                        to="/setquestions"
                        className="mx-4 mb-4 p-4 bg-blue-500 text-sky-100 font-bold text-lg rounded-lg shadow-lg"
                    >
                        setQuestions_SF_F
                    </Link>
                    <Link
                        to="/admin/addquestionmainround"
                        className="mx-4 mb-4 p-4 bg-blue-500 text-sky-100 font-bold text-lg rounded-lg shadow-lg">
                        Adaugă Întrebări
                    </Link>
                    <Link
                        to="/admin/addTeam"
                        className="mx-4 mb-4 p-4 bg-blue-500 text-sky-100 font-bold text-lg rounded-lg shadow-lg">
                        Echipe
                    </Link>
                </div>
            </body>
        </>
    );
}
