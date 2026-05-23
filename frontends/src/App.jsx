import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style/style.css";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signin from "./pages/Signin";

function App() {
  return (
    <Router>

      <Routes>

        {/* Pages WITH Navbar & Footer */}
        {/*Home page*/}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

         {/*menu page*/}
         <Route
          path="/menu"
          element={
            <MainLayout>
              <Menu />
            </MainLayout>
          }
        />

         {/*About page*/}
        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />

        {/*About page*/}
        <Route
          path="/contact"
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          }
        />

        {/* Pages WITHOUT Navbar & Footer */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>

    </Router>
  );
}

export default App;