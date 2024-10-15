import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Complain from "./Pages/Complain";
import Navbar from "./Layout/Navbar";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Error from "./Pages/Error";
import {Logout} from "./Pages/Logout";
import Footer from "./Pages/Footer";
import { useAuth } from "./Store/Auth";
import DashBoard from "./Pages/DashBoard";

const App = () => {

  const { admin } = useAuth();
  console.log("admin status from app compo: ",admin);
  
  
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/complain" element={<Complain />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          {
            admin ===  true ? 
            <Route path="/dash" element={<DashBoard />} />
            :
            ""
          }
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
