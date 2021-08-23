import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const data = {
    name: name,
    height: height,
    weight: weight,
  };
  const [response, setResponse] = useState([]);

  const getHasil = (respon) => {
    console.log("has", respon.bmi);
    setResponse(respon);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "https://bmitaskserver.herokuapp.com",
      data: data,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    })
      .then(function (resp) {
        const respon = resp.data;
        getHasil(respon);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <div className="container mt-4" style={{ width: "70%" }}>
        <div
          className="card"
          style={{ width: "100%", padding: "20px", margin: "20px" }}
        >
          <div className="card-body">
            <h5 className="card-title">BMI Project</h5>
            <h1>{response.name}</h1>
            <form onSubmit={submitHandler}>
              <div className="mb-3 text-start">
                <label htmlFor="name" className="form-label text-start">
                  Nama
                </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  id="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Masukkan nama anda"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3 text-start">
                <label htmlFor="height" className="form-label">
                  Tinggi (m)
                </label>
                <input
                  type="number"
                  min="0.000"
                  step="0.001"
                  max="300.00"
                  required
                  onChange={(e) => {
                    setHeight(e.target.value);
                  }}
                  placeholder="Tinggi dalam meter"
                  className="form-control"
                  id="height"
                />
              </div>
              <div className="mb-3 text-start">
                <label htmlFor="weight" className="form-label">
                  Berat (kg)
                </label>
                <input
                  type="number"
                  required
                  min="0.0"
                  step="0.01"
                  max="300.0"
                  onChange={(e) => {
                    setWeight(e.target.value);
                  }}
                  placeholder="Berat dalam Kg"
                  className="form-control"
                  id="weight"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>

            <div className="card m-4 p-4">
              <div className="card-body">
                <ul className="list-group">
                  <li className="list-group-item text-start">
                    Nama : <span>{response.name}</span>
                  </li>
                  <li className="list-group-item text-start">
                    Tinggi : <span>{response.height}</span>
                  </li>
                  <li className="list-group-item text-start">
                    Berat : <span>{response.weight}</span>
                  </li>
                  <li className="list-group-item text-start">
                    Bmi : <span>{response.bmi}</span>
                  </li>
                  <li className="list-group-item text-start">
                    Bmi Kategori : <span>{response.bmiCategory}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
