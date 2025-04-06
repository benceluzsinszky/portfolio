import { MantineProvider } from "@mantine/core";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
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
          <div className="flex flex-col min-h-screen items-center !scroll-smooth">
            <Header />
            <main className="flex-grow mb-auto max-w-full md:w-10/12 relative">
              <div className="mx-4 sm:mx-8 md:mx-14">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/cv.pdf" element={<CurriculumVitae />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/games/falling_sand" element={<FallingSand />} />
                  <Route path="/games/game_of_life" element={<GameOfLife />} />
                  <Route path="*" element={<HomePage />} />
                </Routes>
              </div>
              <div className="h-20 mt-5"></div>
            </main>
            <Footer />
          </div>
        </Router>
      </HelmetProvider>
    </MantineProvider>
  );
}

export default App;
