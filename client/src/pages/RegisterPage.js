import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";

const RegisterPage = (props) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });
  const [uploadPhoto, setUploadPhoto] = useState();

  const handleUploadPhoto = (e) => {
    const file = e.target.files[0];
    setUploadPhoto(file);
    e.target.value = null;
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    let newData = { ...data, [name]: value };
    setData(newData);
  };
  console.log(uploadPhoto);

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4">
        <h3>Welcome to FastChat</h3>
        <form>
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
                      setUploadPhoto();
                    }}
                    className="text-lg ml-4 hover:text-red-600"
                  >
                    <FaWindowClose></FaWindowClose>
                  </button>
                )}
              </div>
            </label>
            <input
              required
              type="file"
              id="profile_pic"
              name="profile_pic"
              className="bg-slate-200 px-2 py-1 m-2 hidden"
              onChange={(e) => handleUploadPhoto(e)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
