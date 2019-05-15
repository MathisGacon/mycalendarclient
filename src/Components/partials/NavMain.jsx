import React from "react";
import { NavLink } from "react-router-dom";
import isLoggedIn from "../../App";
export default function NavMain() {
  return (
    <div className="mainnav">
      {isLoggedIn ? (
        <nav className="navnotlog">
          <p>
            <NavLink exact to="/home">
              home
            </NavLink>
          </p>
          <p>
            <NavLink className="signupbutton" to="/signup">
              signup
            </NavLink>
            <br />
            <NavLink className="loginbutton" to="/login">
              login
            </NavLink>
          </p>
        </nav>
      ) : (
        <nav className="navlog">
          <p>
            {" "}
            <NavLink exact to="/home">
              home
            </NavLink>
          </p>
          <p>
            <NavLink exact to="/profile">
              profile
            </NavLink>
          </p>
        </nav>
      )}
    </div>
  );
}
