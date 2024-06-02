import React from "react";
import logo from "../assets/logo.png"
const AuthLayouts = ({children}) => {
  // console.log(children.props)
  return (
    <>
      <header className="flex justify-center items-center py-3 h-20 shadow-md bg-white">

        <img src={logo} alt='logo' width={180} height={60}></img>
      </header>

      {children}
    </>
  );
};

export default AuthLayouts;
