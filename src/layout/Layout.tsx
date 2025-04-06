import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import HomeButton from "./HomeButton";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen items-center !scroll-smooth">
      <Header />
      <HomeButton />
      <main className="flex-grow mb-auto max-w-full md:w-10/12 relative">
        <div className="mx-4 sm:mx-8 md:mx-14">
          <Outlet />
        </div>
        <div className="h-20 mt-5"></div>
      </main>
      <Footer />
    </div>
  );
}
