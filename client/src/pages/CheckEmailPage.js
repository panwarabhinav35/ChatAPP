import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaCircleUser } from "react-icons/fa6";

const CheckEmailPage = () => {

  const [data, setData] = useState({
    email: "",
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
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`;
      console.log("URL=>", URL);
      const response = await fetch(URL, {
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json" },
        method: "POST",
      });
      const responseData = await response.json();
      if (responseData.error) {
        toast.error(responseData.message);
      } else {
        toast.success(responseData.message);
        setData({
          email: "",
        });

        navigate("/password",{state:responseData.data});
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };
  return (
    <div className="mt-5">

      <div className="bg-white w-full max-w-sm rounded overflow-hidden p-4 mx-auto">
        <div className="w-fit mx-auto mb-2">
          <FaCircleUser size={80}/>
        </div>
        <h3>Welcome to FastChat</h3>
        <form
          className="grid gap-4 mt-3"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email:</label>
            <input
              required
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              value={data.email}
              className="bg-slate-200 px-2 py-1 m-2 focus:outline-primary"
              onChange={(e) => handleOnChange(e)}
            />
          </div>

          <button className="bg-primary text-lg px-4 py-1 mt-2 rounded hover:bg-secondary font-bold text-white leading-relaxed">
            Lets Go
          </button>
        </form>
        <p className="my-3 text-center">
          Dont have a account?{" "}
          <Link to="/register" className="hover:text-primary font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckEmailPage;
