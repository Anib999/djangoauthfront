import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import Header from "./Components/Header";
import PrivateOutlet from "./Utils/PrivateOutlet";
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route exact path="/" element={<PrivateOutlet />}>
              <Route element={<HomePage />} path="/" />
            </Route>
            <Route element={<LoginPage />} path="/login" />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
