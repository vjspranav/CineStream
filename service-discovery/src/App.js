import "./App.css";
import axios from "axios";
import { useState } from "react";

const services = {
  Backend: "https://api.cinestream.ml",
  "OTT-A": "https://ott-a.cinestream.ml",
  "OTT-B": "https://ott-b.cinestream.ml",
  Razorpay: "https://rp.cinestream.ml",
};

async function checkStatus(status, setStatus) {
  Object.keys(services).forEach(async (key) => {
    const service = services[key];
    try {
      setStatus((prev) => ({ ...prev, [key]: "Checking" }));
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      // await only for 5 seconds
      const response = await axios.get(service + "/service-status", {
        timeout: 5000,
      });
      console.log(response);
      // If timeout, then response will be undefined
      if (response) {
        setStatus((prev) => ({
          ...prev,
          [key]: response.data.status || response.data,
        }));
      } else {
        setStatus((prev) => ({
          ...prev,
          [key]: "Service Unavailable",
        }));
      }
    } catch (err) {
      console.log(err);
    } finally {
      console.log(status);
    }
  });
}

function App() {
  const [status, setStatus] = useState({
    Backend: "NA",
    "OTT-A": "NA",
    "OTT-B": "NA",
    Razorpay: "NA",
  });

  return (
    <div
      className="App App-header"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Service Discovery</h1>
      <h2>Services</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3>Backend: {status.Backend}</h3>
        <h3>OTT-A: {status["OTT-A"]}</h3>
        <h3>OTT-B: {status["OTT-B"]}</h3>
        <h3>Razorpay: {status.Razorpay}</h3>
      </div>
      <button
        onClick={() => {
          checkStatus(status, setStatus);
        }}
      >
        Check Status
      </button>
    </div>
  );
}

export default App;
