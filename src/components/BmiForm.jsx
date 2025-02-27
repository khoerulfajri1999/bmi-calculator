import React, { useState } from "react";
import male from "../assets/male.svg";
import female from "../assets/female.svg";
import male2 from "../assets/male2.svg";
import female2 from "../assets/female2.svg";
import BmiResult from "./BmiResult";
import "../styles/global.css";
import BmiHistory from "./BmiHistory";

const BmiForm = () => {
  const [selectedGender, setSelectedGender] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [data, setData] = useState(null);
  const [bmi, setBmi] = useState(0);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("Nama tidak boleh kosong");
      return;
    }

    if (height < 50 || height > 250) {
      alert("Tinggi badan harus diantara 100 cm dan 250 cm");
      return;
    }

    if (weight < 10 || weight > 300) {
      alert("Berat badan harus diantara 10 kg dan 300 kg");
      return;
    }

    if (age < 10) {
      alert("Minimal umur adalah 10 tahun");
      return;
    }

    if (!selectedGender) {
      alert("Pilih jenis kelamin terlebih dahulu");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const bmiResult = (weight / (height / 100) ** 2).toFixed(1);
      let kategori = "";

      if (bmiResult < 18.5) {
        kategori = "Underweight";
      } else if (bmiResult < 24.9) {
        kategori = "Normal";
      } else if (bmiResult < 29.9) {
        kategori = "Overweight";
      } else {
        kategori = "Obese";
      }
      const currentDate = new Date().toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const userData = {
        Nama: name.trim(),
        Umur: age,
        Gender: selectedGender,
        Tinggi: height,
        Berat: weight,
        BMI: bmiResult,
        Kategori: kategori,
        Date: currentDate,
      };

      setData(userData);

      const history = JSON.parse(localStorage.getItem("bmiHistory")) || [];
      history.push(userData);

      localStorage.setItem("bmiHistory", JSON.stringify(history));
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light row">
      <div className="card p-4 text-center" style={{ width: "55rem" }}>
        <h2 className="mb-3">BMI Calculator</h2>

        <div className="mb-3 d-flex gap-4 justify-content-center">
          <img src={selectedGender === "Laki-laki" ? male : male2} alt="male" className={`gender ${selectedGender === "Laki-laki" ? "selected" : ""}`} onClick={() => setSelectedGender("Laki-laki")} />
          <img src={selectedGender === "Perempuan" ? female : female2} alt="female" className={`gender ${selectedGender === "Perempuan" ? "selected" : ""}`} onClick={() => setSelectedGender("Perempuan")} />
        </div>

        <input type="text" className="form-control text-center bg-danger text-white fw-bold" value={selectedGender} readOnly placeholder="Pilih jenis kelamin" />

        <div className="container mt-2 mb-3">
          <div className="floating-input">
            <input type="text" className="" value={name} onChange={(e) => setName(e.target.value)} placeholder="" />
            <label>Nama</label>
          </div>
        </div>

        <div className="container mb-3">
          <div className="floating-input">
            <input type="number" className="" value={age} onChange={(e) => setAge(e.target.value)} placeholder="" />
            <label>Umur</label>
          </div>
        </div>

        <div className="container mb-3">
          <div className="floating-input">
            <input type="number" className="" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="" />
            <label>Tinggi (cm)</label>
          </div>
        </div>

        <div className="container mb-3">
          <div className="floating-input">
            <input type="number" className="" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="" />
            <label>Berat (kg)</label>
          </div>
        </div>

        {/* <div className="mb-3">
          <label className="form-label">Tinggi Badan (cm)</label>
          <input type="range" min={100} max={300} className="form-range custom-range" value={height} onChange={(e) => setHeight(e.target.value)} />
          <div className="floating-input2 m-auto d-flex align-items-center justify-content-center">
            <input type="text" min={100} max={300} className="mt-2 text-center" value={height} onChange={(e) => setHeight(Math.max(100, Math.min(300, Number(e.target.value))))} />
            <span className="fw-bold mt-2">cm</span>
          </div>
          <div className="progress custom-progress mt-2">
            <div className="progress-bar custom-progress-bar bg-danger" style={{ width: `${(height / 300) * 100}%` }}>
              {height} cm
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Berat Badan (kg)</label>
          <input type="range" min={10} max={200} className="form-range custom-range" value={weight} onChange={(e) => setWeight(e.target.value)} />
          <div className="floating-input2 m-auto d-flex align-items-center justify-content-center">
            <input type="text" min={10} max={200} className="mt-2 text-center" value={weight} onChange={(e) => setWeight(Math.max(10, Math.min(200, Number(e.target.value))))} />
            <span className="fw-bold mt-2">kg</span>
          </div>
          <div className="progress custom-progress mt-2">
            <div className="progress-bar custom-progress-bar bg-danger" style={{ width: `${(weight / 200) * 100}%` }}>
              {weight} kg
            </div>
          </div>
        </div> */}

        <button className="btn btn-danger mt-3 px-4 py-2 fw-bold" onClick={handleSubmit}>
          Submit Data
        </button>

        {isLoading ? (
          <div className="d-flex justify-content-center mt-5 mb-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : data ? (
          <BmiResult data={data} setBmi={setBmi} setCategory={setCategory} />
        ) : (
          <p className="mt-3 opacity-50">Hasil perhitungan akan muncul di sini</p>
        )}
        <BmiHistory />
      </div>
    </div>
  );
};

export default BmiForm;
