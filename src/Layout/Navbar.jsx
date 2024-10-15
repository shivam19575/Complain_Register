
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../Store/Auth";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

const Navbar = () => {
  const { isLoggedIn, admin, isLoading } = useAuth(); // Use isLoading to handle loading state
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header>
        <div className="headerContainer">
          <div className="logo_Brand">
           {/* <img src="Images/logo.jpg" alt="logo here" /> */}
          </div>

          <nav>
            <div className="hamburgerMenu">
              <NavLink onClick={() => setMenuOpen(!menuOpen)}>
                <GiHamburgerMenu className="iconHamb" />
              </NavLink>
            </div>

            <ul className={menuOpen ? "open" : ""}>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>

              {isLoggedIn ? (
                <>
                  <li>
                    <NavLink to="/complain">Complain</NavLink>
                  </li>

                  {/*  dashboard  if admin is there */}
                  {!isLoading && admin && (
                    <li>
                      <NavLink to="/dash">Dashboard</NavLink>
                    </li>
                  )}

                  <li>
                    <NavLink to="/logout">Logout</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
