import React, { useEffect, useState } from "react";

const BmiResult = ({ data }) => {
  const [bmi, setBmi] = useState(0);
  const [category, setCategory] = useState("");
  const [bmiPosition, setBmiPosition] = useState(0);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    if (data.Berat && data.Tinggi) {
      calculateBmi();
    }
  }, [data]);

  const calculateBmi = () => {
    const bmiResult = (data.Berat / (data.Tinggi / 100) ** 2).toFixed(1);
    setBmi(bmiResult);

    let kategori = "";
    let bmiPos = 0;
    let notif = "";

    if (bmiResult < 18.5) {
      kategori = "Underweight";
      notif = "Utamakan hidup sehat dan perhatikan konsumsi harian";
      bmiPos = ((bmiResult - 1.1) / (18.5 - 1.1)) * 23.6;
    } else if (bmiResult < 24.9) {
      kategori = "Normal";
      notif = "Diet yang baik dapat mempertahankan kesehatan & imun, Pertahankan asupan kalori sesuai dengan kebutuhan kalori harian & konsumsi makanan sehat";
      bmiPos = 23.6 + ((bmiResult - 18.5) / (24.9 - 18.5)) * 19.2;
    } else if (bmiResult < 29.9) {
      kategori = "Overweight";
      notif = "Dalam 60% kasus, pola makan yang buruk dapat berisiko Diabetes";
      bmiPos = 42.8 + ((bmiResult - 24.9) / (29.9 - 24.9)) * 16.6;
    } else {
      kategori = "Obese";
      notif = "Dalam 60% kasus, pola makan yang buruk dapat berisiko Diabetes";
      bmiPos = 59.4 + ((bmiResult - 29.9) / (200 - 29.9)) * 40.6;
    }

    setCategory(kategori);
    setNotification(notif);
    setBmiPosition(bmiPos.toFixed(1));
  };

  return (
    <div className="card bmi-card">
      <h4 className="bmi-title text-success fw-bold fs-2">
        Hasil BMI (<span className="fw-bold fs-4">untuk {data.Gender}</span>)
      </h4>
      <div className="bmi-info">
        <strong>Nama:</strong> {data.Nama}
      </div>
      <div className="bmi-info">
        <strong>Umur:</strong> {data.Umur} tahun
      </div>

      <div className="bmi-info">
        <strong>BMI:</strong> {bmi}
      </div>
      <div className="d-flex justify-content-between">
        <div className="bmi-info mt-5 text-info">
          <strong>Berat:</strong> {data.Berat} kg
        </div>
        <div className="bmi-category fs-1 mt-3">{category}</div>
        <div className="bmi-info mt-5 text-info">
          <strong>Tinggi:</strong> {data.Tinggi} cm
        </div>
      </div>

      <div className="bmi-progress-container">
        <div className="progress bmi-progress">
          <div className="progress-bar bg-danger" style={{ width: "23.6%" }}></div>
          <div className="progress-bar bg-success" style={{ width: "19.2%" }}></div>
          <div className="progress-bar bg-warning" style={{ width: "16.6%" }}></div>
          <div className="progress-bar bg-danger" style={{ width: "40.6%" }}></div>
        </div>

        <div className="bmi-pointer" style={{ left: `${bmiPosition}%` }}>
          {bmi}
        </div>
        <div className="bmi-pointer-arrow" style={{ left: `${bmiPosition}%` }}></div>
      </div>

      <div className="bmi-info mt-4 opacity-50">{notification}</div>
    </div>
  );
};

export default BmiResult;
