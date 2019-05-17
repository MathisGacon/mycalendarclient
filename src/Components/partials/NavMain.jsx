import React from "react";
import { NavLink } from "react-router-dom";
import isLoggedIn from "../../App";
export default function NavMain() {
  return isLoggedIn ? (
    <div className="mainnav">
      <nav className="navnotlog">
        <NavLink exact to="/home">
          home
        </NavLink>
      </nav>
      <div className="sub">
        <NavLink className="signupbutton" to="/signup">
          signup
        </NavLink>

        <NavLink className="loginbutton" to="/login">
          login
        </NavLink>
      </div>
    </div>
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
  );
}
