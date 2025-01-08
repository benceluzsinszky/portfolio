import { MantineProvider } from "@mantine/core";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/homePage/HomePage";

function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Router>
        <div className="flex flex-col min-h-screen items-center">
          <Header />
          <main className="flex-grow mb-auto w-10/12">
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </MantineProvider>
  );
}

export default App;
