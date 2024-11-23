import { useState } from "react";

export default function ScoreDisplay() {
  const [id, setId] = useState("");
  const [deleteId, setDeleteId] = useState(""); // Pentru ID-ul care va fi șters
  const [idsf, setIdsf] = useState([]);

  const save = () => {
    const existIdsf = JSON.parse(localStorage.getItem("idsf") ?? "[]");
    const updatedIdsf = [...existIdsf, id];
    localStorage.setItem("idsf", JSON.stringify(updatedIdsf));
    setId("");
    setIdsf(updatedIdsf);
  };

  const loadIdsf = () => {
    const savedIdsf = JSON.parse(localStorage.getItem("idsf") ?? "[]");
    setIdsf(savedIdsf);
  };

  const deleteIdFromList = () => {
    const existIdsf = JSON.parse(localStorage.getItem("idsf") ?? "[]");
    const updatedIdsf = existIdsf.filter((item) => item !== deleteId); 
    localStorage.setItem("idsf", JSON.stringify(updatedIdsf));
    setIdsf(updatedIdsf); 
    setDeleteId(""); 
  };

  return (
    <>
      <h1 className="ml-8">Seteaza intrebarile pentru finala</h1>
      <div className="text-red-500 m-8">
      <p >ATENTIE: Ordinea in care introduceti id-urile influenteaza aparitia acestora in semifinala si finala</p>
      <p >(Primele 5 id-uri introduse o sa fie pentru semifinala 1, urmatoarele 5 pentru semifinala 2 si ulimele 5 pentru finala)!!!</p>
      </div>
      <input className="ml-8"
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="id întrebare1"
      />
      <button className="ml-8" onClick={save}>Salvează</button>
      <button className="mx-8" onClick={loadIdsf}>Încarcă ID-uri</button>

      <div className="mt-4">
        <input
        className="ml-8"
          type="text"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
          placeholder="ID de șters"
        />
        <button className="ml-4" onClick={deleteIdFromList}>Șterge</button>
      </div>

  
      <ul className="mt-4">
        {idsf.map((savedId, index) => (
          <li className="ml-8" key={index}>Intrebarea {index+1}. ID: {savedId}</li>
        ))}
      </ul>
    </>
  );
}