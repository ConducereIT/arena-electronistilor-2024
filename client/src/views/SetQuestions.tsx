import { useState } from "react";

export default function ScoreDisplay() {
  const [id, setId] = useState<string>(""); // Tip explicit pentru id
  const [deleteId, setDeleteId] = useState<string>(""); // Tip explicit pentru ID-ul de șters
  const [idsf, setIdsf] = useState<string[]>([]); // Tip explicit pentru listă

  const save = () => {
    const existIdsf: string[] = JSON.parse(localStorage.getItem("idsf") ?? "[]");
    const updatedIdsf = [...existIdsf, id];
    localStorage.setItem("idsf", JSON.stringify(updatedIdsf));
    setId("");
    setIdsf(updatedIdsf);
  };

  const loadIdsf = () => {
    const savedIdsf: string[] = JSON.parse(localStorage.getItem("idsf") ?? "[]");
    setIdsf(savedIdsf);
  };

  const deleteIdFromList = () => {
    const existIdsf: string[] = JSON.parse(localStorage.getItem("idsf") ?? "[]");
    const updatedIdsf = existIdsf.filter((item: string) => item !== deleteId); // Tip explicit pentru `item`
    localStorage.setItem("idsf", JSON.stringify(updatedIdsf));
    setIdsf(updatedIdsf);
    setDeleteId("");
  };

  return (
    <>
      <h1 className="ml-8">Setează întrebările pentru finală</h1>
      <div className="text-red-500 m-8">
        <p>ATENȚIE: Ordinea în care introduceți ID-urile influențează apariția acestora în semifinală și finală</p>
        <p>
          (Primele 5 ID-uri introduse o să fie pentru semifinala 1, următoarele 5 pentru semifinala
          2 și ultimele 5 pentru finală)!!!
        </p>
      </div>
      <input
        className="ml-8"
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="ID întrebare"
      />
      <button className="ml-4" onClick={save}>
        Salvează
      </button>
      <button className="mx-8" onClick={loadIdsf}>
        Încarcă ID-uri
      </button>

      <div className="mt-4">
        <input
          className="ml-8"
          type="text"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
          placeholder="ID de șters"
        />
        <button className="ml-4" onClick={deleteIdFromList}>
          Șterge
        </button>
      </div>

      <ul className="mt-4">
        {idsf.map((savedId, index) => (
          <li className="ml-8" key={index}>
            Întrebarea {index + 1}. ID: {savedId}
          </li>
        ))}
      </ul>
    </>
  );
}
