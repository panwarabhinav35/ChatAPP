import React from "react";
import { loggedInUser, logout } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Forgotpassword = () => {
  const dispatch = useDispatch();
  const user = useSelector(loggedInUser);
  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/logout`
      );
      const responseData = await response.json();

      if (responseData.success) {
        dispatch(logout());
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(user);
  return (
    <div>
      Forgotpassword
      <button onClick={(e) => handleLogout(e)}>Logout</button>
    </div>
  );
};

export default Forgotpassword;
