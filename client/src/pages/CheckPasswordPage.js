import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Avatar from "../components/Avatar";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/userSlice";

const CheckPasswordPage = () => {
  const dispatch = useDispatch()
  const location = useLocation();
  const userId = location.state?._id;
  const [data, setData] = useState({
    userId,
    password: "",
  });
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    let newData = { ...data, [name]: value };
    setData(newData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log(data);
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`;
      const response = await fetch(URL, {
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json" },
        method: "POST",
      });
      const responseData = await response.json();
      // console.log(responseData);
      if (responseData.error) {
        toast.error(responseData.message);
      } else {
        toast.success(responseData.message);
        setData({
          password: "",
        });
        dispatch(setToken(responseData.token))
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };
  return userId ? (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm rounded overflow-hidden p-4 mx-auto">
        <div className="w-fit mx-auto mb-2">
          <Avatar userInfo={location.state}></Avatar>
        </div>
        <h3>Welcome to FastChat {location.state.name}</h3>
        <form
          className="grid gap-4 mt-5"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password:</label>
            <input
              required
              type="password"
              id="password"
              name="password"
              placeholder="********"
              value={data.password}
              className="bg-slate-200 px-2 py-1 m-2 focus:outline-primary"
              onChange={(e) => handleOnChange(e)}
            />
          </div>

          <button className="bg-primary text-lg px-4 py-1 mt-2 rounded hover:bg-secondary font-bold text-white leading-relaxed">
            Log In
          </button>
        </form>
        <p className="my-3 text-center">
          Forgot Password?{" "}
          <Link to="/forgot-password" className="hover:text-primary font-semibold">
            Reset
          </Link>
        </p>
      </div>
    </div>
  ) : (
    <>
      <button className="bg-primary text-lg px-4 py-1 mt-2 rounded hover:bg-secondary font-bold text-white leading-relaxed">
        <Link to="/email">Please Enter Email</Link>
      </button>
    </>
  );
};

export default CheckPasswordPage;
