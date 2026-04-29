import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ToastContainer from "../ui/ToastContainer";

export default function Layout() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}
