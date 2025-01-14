import { MantineProvider } from "@mantine/core";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HtmlCloseIcon from "./assets/icons/html_close.svg";
import HtmlOpenIcon from "./assets/icons/html_open.svg";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/homePage/HomePage";

function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Router>
        <div className="flex flex-col min-h-screen items-center">
          <Header />
          <main className="flex-grow mb-auto w-10/12 relative">
            <Link to="/">
              <img
                src={HtmlOpenIcon}
                alt="HTML open tag"
                className="w-20 h-20 mb-5"
              />
            </Link>
            <div className="mx-14">
              <Routes>
                <Route path="/" element={<HomePage />} />
              </Routes>
            </div>
            <div className="h-20 mt-5"></div>
            <img
              src={HtmlCloseIcon}
              alt="HTML close tag"
              className="w-20 h-20 mt-5 absolute bottom-0"
            />
          </main>
          <Footer />
        </div>
      </Router>
    </MantineProvider>
  );
}

export default App;
