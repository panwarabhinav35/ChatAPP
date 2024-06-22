import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  loggedInToken,
  setOnlineUser,
  setUser,
} from "../redux/userSlice";
import Sidebar from "../components/Sidebar";
import logo from "../assets/logo.png";
import io from "socket.io-client";
import { SocketContext } from "../redux/contextStore";

const Home = () => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();
  const userToken = useSelector(loggedInToken);
  const location = useLocation();
  const getUserDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/user-details`,
        {
          method: "POST",
          body: JSON.stringify({ token: userToken }),
          headers: { "Content-type": "application/json" },
          // credentials:'include'
        }
      );
      const responseData = await response.json();
      if (responseData.success) {
        dispatch(setUser(responseData.data));
        if (responseData.data.logout) {
          navigate("/email");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  // SOCKET CONNECTION

  useEffect(() => {
    const socketConnection = io(process.env.REACT_APP_BACKEND_URL, {
      auth: {
        token: userToken,
      },
    });

    socketConnection.on("onlineUser", (data) => {
      dispatch(setOnlineUser(data));
    });

    setSocket(socketConnection);
    return () => {
      socketConnection.disconnect();
      dispatch(setOnlineUser([]));
    };
  }, []);

  const basePath = location.pathname === "/";
  return (
    <SocketContext.Provider value={{socketConnection:socket, setSocket}}>
      <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
        <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
          <Sidebar />
        </section>
        <section className={`${basePath && "hidden"}`}>
          <Outlet></Outlet>
        </section>
        <div
          className={`flex-col justify-center items-center gap hidden ${
            basePath && "lg:flex"
          }`}
        >
          <div>
            <img src={logo} width={200} alt="logo" />
          </div>
          <p className="text-lg mt-2 text-slate-500">
            Select user to send message
          </p>
        </div>
      </div>
    </SocketContext.Provider>
  );
};

export default Home;
