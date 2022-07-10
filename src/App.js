import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import Header from "./Components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route element={<HomePage />} path="/" exact />
          <Route element={<LoginPage />} path="/login" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
