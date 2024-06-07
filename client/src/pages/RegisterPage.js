import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";
import { uploadFile } from "../helper/uploadFile";

const RegisterPage = (props) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });
  const [uploadPhoto, setUploadPhoto] = useState("");

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file);
    // console.log(uploadPhoto);
    setUploadPhoto(file);
    let newData = { ...data };
    newData.profile_pic = uploadPhoto.url;
    setData(newData);
    e.target.value = "";
  };

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
      const URL = `http://localhost:8080/api/register`;
      console.log("URL=>", URL);
      const response = await fetch(URL, {
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json" },
        method: "POST",
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm rounded overflow-hidden p-4 mx-auto">
        <h3>Welcome to FastChat</h3>
        <form
          className="grid gap-4 mt-5"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name:</label>
            <input
              required
              type="text"
              id="name"
              name="name"
              placeholder="EnterYourName"
              value={data.name}
              className="bg-slate-200 px-2 py-1 m-2 focus:outline-primary"
              onChange={(e) => handleOnChange(e)}
            />
          </div>
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
          <div className="flex flex-col gap-1">
            <label htmlFor="profile_pic">
              Photo:
              <div className="h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer">
                <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
                  {uploadPhoto?.name
                    ? uploadPhoto.name
                    : "Upload Profile Photo"}
                </p>
                {uploadPhoto?.name && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setUploadPhoto("");
                    }}
                    className="text-lg ml-4 hover:text-red-600"
                  >
                    <FaWindowClose></FaWindowClose>
                  </button>
                )}
              </div>
            </label>
            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              className="bg-slate-200 px-2 py-1 m-2 hidden"
              onChange={(e) => handleUploadPhoto(e)}
            />
          </div>
          <button className="bg-primary text-lg px-4 py-1 mt-2 rounded hover:bg-secondary font-bold text-white leading-relaxed">
            Register
          </button>
        </form>
        <p className="my-3 text-center">
          Already have a account?{" "}
          <Link to="/email" className="hover:text-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
