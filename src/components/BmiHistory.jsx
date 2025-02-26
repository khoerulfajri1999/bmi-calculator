import React, { useEffect, useState } from "react";

const BmiHistory = () => {
  const [bmiHistory, setBmiHistory] = useState([]);

  useEffect(() => {
    const storedBmiHistory = JSON.parse(localStorage.getItem("bmiHistory")) || [];
    setBmiHistory(storedBmiHistory);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("bmiHistory");
    setBmiHistory([]);
  };

  return (
    <div className="card bmi-card p-3">
      <h4 className="text-center">Riwayat BMI</h4>

      {bmiHistory.length === 0 ? (
        <p className="text-center opacity-50">Belum ada riwayat</p>
      ) : (
        <>
          <ul className="list-group">
            {bmiHistory.map((entry, index) => (
              <li key={index} className="list-group-item">
                <strong>{entry.Nama}</strong> - {entry.BMI} ({entry.Kategori})
                <br />
                <small className="text-muted">Tanggal: {entry.Date}</small>
              </li>
            ))}
          </ul>

          <button className="btn btn-danger mt-3" onClick={clearHistory}>
            Hapus Riwayat
          </button>
        </>
      )}
    </div>
  );
};

export default BmiHistory;
