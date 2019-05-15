import React from "react";
import { NavLink } from "react-router-dom";

export default function NavMain() {
  return (
    <div className="botnav">
      <nav>
        <p>
          <NavLink to="/">More</NavLink>
        </p>
        <p>
          <NavLink to="/">Contact</NavLink>
        </p>
      </nav>
    </div>
  );
}
