import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { loggedInToken, loggedInUser, setUser } from "../redux/userSlice";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector(loggedInUser)
  const navigate = useNavigate();
  const userToken  = useSelector(loggedInToken)
  const getUserDetails = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user-details`,{
        method:"POST",
        body : JSON.stringify({token: userToken}),
        headers: { "Content-type": "application/json" }
        // credentials:'include'
      });
      const responseData = await response.json();
      if(responseData.success){
        dispatch(setUser(responseData.data))
        if(responseData.data.logout){
          navigate('/email')
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  // console.log(userData,userToken)
  return (
    <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
      <section className="bg-white">
        <Sidebar/>
      </section>
      <section>
        <Outlet></Outlet>
      </section>
    </div>
  );
};

export default Home;
