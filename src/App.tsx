import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomeButton from "./components/common/HomeButton";
import GameOfLife from "./components/game_of_life/GameOfLife";
import HomePage from "./components/home/HomePage";
import Placeholder from "./components/placeholder/Placeholder";
import RockPaperScissors from "./components/rock_paper_scissors/RockPaperScissors";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <HomeButton />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game-of-life" element={<GameOfLife />} />
          <Route path="/rock-paper-scissors" element={<RockPaperScissors />} />
          <Route path="/placeholder" element={<Placeholder />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
