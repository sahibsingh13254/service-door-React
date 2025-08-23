import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}