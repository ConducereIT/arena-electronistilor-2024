import React, { useState } from "react";

const AdminQuickRound = () => {
  const [rows, setRows] = useState([
    { text: "", score: 0, hidden: true },
    { text: "", score: 0, hidden: true },
    { text: "", score: 0, hidden: true },
    { text: "", score: 0, hidden: true },
    { text: "", score: 0, hidden: true },
  ]);

  const handleTextChange = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].text = value;
    setRows(updatedRows);
  };

  const handleScoreChange = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].score = parseFloat(value) || 0;
    setRows(updatedRows);
  };

  const toggleVisibility = (index) => {
    const updatedRows = [...rows];
    updatedRows[index].hidden = !updatedRows[index].hidden;
    setRows(updatedRows);
  };

  const calculateTotal = () => {
    return rows.reduce((total, row) => (!row.hidden ? total + row.score : total), 0);
  };

  return (
    <div className="bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 h-screen flex flex-col justify-center items-center font-poppins">
      <div className="w-[700px] rounded-xl p-5 bg-sky-100 shadow-lg">
        {rows.map((row, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 mb-4 bg-sky-100 rounded-lg shadow-md"
          >
            <input
              type="text"
              value={row.text}
              onChange={(e) => handleTextChange(index, e.target.value)}
              placeholder="Introdu răspunsul..."
              className="flex-1 max-w-[400px] p-2 rounded-md bg-sky-100 text-center text-4xl font-bold text-black"
            />
            {row.hidden ? (
              <div
                onClick={() => toggleVisibility(index)}
                className="w-[80px] h-[50px] flex items-center justify-center rounded-md bg-sky-100 text-white cursor-pointer shadow-md"
              >
              </div>
            ) : (
              <input
                type="text"
                inputMode="numeric"
                value={row.score}
                onChange={(e) => handleScoreChange(index, e.target.value)}
                onBlur={() => toggleVisibility(index)}
                className="w-[80px] h-[50px] rounded-md bg-sky-100 text-black text-center text-4xl font-bold"
              />
            )}
          </div>
        ))}
        <div className="flex justify-between mt-5 p-4 text-5xl bg-blue-900 text-yellow-400 rounded-lg font-bold">
          <span>TOTAL</span>
          <span>{calculateTotal()}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminQuickRound;
