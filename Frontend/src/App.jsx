import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePlayer from "./pages/CreatePlayer";
import EditPlayer from "./pages/EditPlayer";
import UploadPlayers from "./pages/UploadPlayers";
import { PlayerDetail } from "./components/player";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<CreatePlayer />} />
                <Route path="/edit/:id" element={<EditPlayer />} />
                <Route path="/upload" element={<UploadPlayers />} />
                <Route path="/players/:id" element={<PlayerDetail />} />
            </Routes>
        </Router>
    );
}

export default App;
