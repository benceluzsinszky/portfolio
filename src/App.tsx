import { MantineProvider } from "@mantine/core";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import AboutPage from "./pages/aboutPage/AboutPage";
import CurriculumVitae from "./pages/cvPage/CurriculumVitae";
import FallingSand from "./pages/games/fallingSand/FallingSand";
import GameOfLife from "./pages/games/gameOfLife/GameOfLife";
import HomePage from "./pages/homePage/HomePage";

function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <HelmetProvider>
        <Helmet>
          <title>Bence Luzsinszky</title>
          <meta
            name="description"
            content="Bence Luzsinszky's portfolio website"
          />
          <link rel="icon" href="/code.svg" />
        </Helmet>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/cv.pdf" element={<CurriculumVitae />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/games/falling_sand" element={<FallingSand />} />
              <Route path="/games/game_of_life" element={<GameOfLife />} />
              <Route path="*" element={<HomePage />} />
            </Route>
          </Routes>
        </Router>
      </HelmetProvider>
    </MantineProvider>
  );
}

export default App;
