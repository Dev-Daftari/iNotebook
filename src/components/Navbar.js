import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";

const Navbar = (props) => {
  // const [search, setSearch] = useState("")
  const context = useContext(NoteContext);
  const { search, setSearch } = context;
  let navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {}, [location]);
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    props.showAlert("Logged out successfully!", "success");
    navigate("/login");
  };

  const handleOnChange = (event) => {
    var term = event.target.value;
    // setSearch({...search, [event.target.name] : term});
    setSearch(term);
    console.log(search);
    // searchNotes(term);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // searchNotes(search);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            <form className="d-flex mx-2" role="search" onSubmit={handleSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                disabled={!localStorage.getItem("token")}
                onChange={handleOnChange}
              />
              <button
                disabled={!localStorage.getItem("token")}
                className="btn btn-outline-light"
                type="submit"
              >
                Search
              </button>
            </form>
            <div className="mx-2">
              {!localStorage.getItem("token") ? (
                <>
                  {" "}
                  <Link
                    className="btn btn-success mx-1"
                    to="/login"
                    role="button"
                  >
                    Login
                  </Link>
                  <Link
                    className="btn btn-primary mx-1"
                    to="/signup"
                    role="button"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                // <button onClick={handleLogout} className="btn btn-primary mx-1">
                //   {" "}
                //   Logout {localStorage.getItem("name")} {" "}
                // </button>
                <div className="dropdown">
                  <button
                    className="btn btn-success dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {localStorage.getItem("name")}
                  </button>
                  <ul
                    className="dropdown-menu my-1.5"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <button
                        onClick={handleLogout}
                        className="btn btn-primary dropdown-item"
                      >
                        {" "}
                        Logout{" "}
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
