import "./App.css";
import axios from "axios";
import { useState } from "react";

const services = {
  Backend: "http://localhost:3001",
  "OTT-A": "http://localhost:3002",
  "OTT-B": "http://localhost:3003",
  Razorpay: "http://127.0.0.1:5000",
};

function App() {
  async function checkStatus() {
    Object.keys(services).forEach(async (key) => {
      const service = services[key];
      try {
        setStatus((prev) => ({ ...prev, [key]: "Checking" }));
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await axios.get(service + "/service-status");
        console.log(response);
        setStatus((prev) => {
          return { ...prev, [key]: response.data.status || response.data };
        });
      } catch (err) {
        console.log(err);
      } finally {
        console.log(status);
      }
    });
  }

  const [status, setStatus] = useState({
    Backend: "Checking",
    "OTT-A": "Checking",
    "OTT-B": "Checking",
    Razorpay: "Checking",
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
      <button onClick={checkStatus}>Check Status</button>
    </div>
  );
}

export default App;
