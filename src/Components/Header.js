import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

const Header = () => {
  const { user, logOutUser } = useContext(AuthContext);
  return (
    <div>
      {user ? (
        <p onClick={logOutUser}>Logout</p>
      ) : (
        <>
          <Link to="/login">Login</Link> |
        </>
      )}
      <Link to="/"> Home</Link>
      {user && <p>Hello {user.username}</p>}
    </div>
  );
};

export default Header;
