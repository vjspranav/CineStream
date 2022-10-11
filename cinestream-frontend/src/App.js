import "./App.css";
import { createContext } from "react";

// Custom imports
import Layout from "./pages/Layout";

export const CineStreamContext = createContext();

function App() {
  return (
    <CineStreamContext.Provider value={{}}>
      <div className="App">
        <Layout />
      </div>
    </CineStreamContext.Provider>
  );
}

export default App;
