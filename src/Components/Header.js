import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

const Header = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Link to="/login">Login</Link>
      |
      {
        user ?
        <p>Logout</p>
        :
        <Link to="/">Home</Link>
      }
      {user && <p>Hello {user.username}</p>}
    </div>
  );
};

export default Header;
