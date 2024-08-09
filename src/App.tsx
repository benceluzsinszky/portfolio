import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import GameOfLife from './components/game_of_life/GameOfLife';
import HomePage from './components/home/HomePage';

export default function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/game-of-life' element={<GameOfLife />} />
      </Routes>
      </BrowserRouter>
    </>
  );
};