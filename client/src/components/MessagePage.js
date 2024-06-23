import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SocketContext } from "../redux/contextStore";
import { DataUser, setDataUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { IoIosArrowBack } from "react-icons/io";
import { RiFileAddFill } from "react-icons/ri";
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa";
import Avatar from "./Avatar";
import { uploadFile } from "../helper/uploadFile";
import Loading from "./Loading";
import { IoCloseCircle } from "react-icons/io5";
import backgroundImage from "../assets/wallapaper.jpeg";
import { MdSend } from "react-icons/md";

const MessagePage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const dataUser = useSelector(DataUser);
  const { socketConnection } = useContext(SocketContext);
  const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    videoUrl: "",
    imageUrl: "",
  });
  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", userId);
      socketConnection.on("message-user", (data) => {
        // console.log(data);
        dispatch(setDataUser(data));
      });
    }
  }, [dispatch, socketConnection, userId]);
  // console.log(dataUser);
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    const uploadPhoto = await uploadFile(file);
    let newMessage = { ...message };
    newMessage.imageUrl = uploadPhoto?.url;
    setMessage(newMessage);
    setOpenImageVideoUpload(false);
    setLoading(false);
    e.target.value = "";
  };
  const handleUploadVideo = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    const uploadPhoto = await uploadFile(file);
    let newMessage = { ...message };
    newMessage.videoUrl = uploadPhoto?.url;
    setMessage(newMessage);
    setOpenImageVideoUpload(false);
    setLoading(false);
    e.target.value = "";
  };
  const handleClearUploadImage = () => {
    let newMessage = { ...message };
    newMessage.imageUrl = "";
    setMessage(newMessage);
  };
  const handleClearUploadVideo = () => {
    let newMessage = { ...message };
    newMessage.videoUrl = "";
    setMessage(newMessage);
  };
  const handleOnChangeMessage = (e) => {
    const { name, value } = e.target;
    let newMessage = { ...message };
    newMessage[name] = value;
    setMessage(newMessage);
  };
  const handleSendMessage = (e) => {
    e.preventDefault();
  };
  // console.log(message);
  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-no-repeat bg-cover"
    >
      <header className="sticky top-0 h-16 bg-white p-2 flex justify-between items-center px-4">
        <div className="flex justify-start w-full mt-1 gap-4">
          <Link to="/" className="mt-4 hover:text-primary">
            <IoIosArrowBack size={25}></IoIosArrowBack>
          </Link>
          <div>
            <Avatar
              className="mt-2"
              userInfo={dataUser}
              width={25}
              height={25}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg mt-1 text-ellipsis line-clamp-1">
              {dataUser?.name}
            </h3>
            <p className="mb-1">
              {dataUser.online ? (
                <span className="text-primary">online</span>
              ) : (
                <span className="text-slate-400">offline</span>
              )}
            </p>
          </div>
        </div>
        <div>
          <div className="cursor-pointer hover:text-primary">
            <RxDropdownMenu size={25} />
          </div>
        </div>
      </header>

      {/* Show all Message */}
      <section
        className="h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative bg-slate-200 bg-opacity-50"
        onClick={() => setOpenImageVideoUpload(false)}
      >
        jvjhvhjvhjvjh
        {/* Upload image Dispay */}
        {loading && (
          <div className="h-full w-full flex justify-center items-center">
            <Loading></Loading>
          </div>
        )}
        {!loading && message.imageUrl && (
          <div className="w-full h-full bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div
              className="w-fit p-2 absolute top-0 right-0 hover:text-primary cursor-pointer"
              onClick={() => {
                handleClearUploadImage();
              }}
            >
              <IoCloseCircle size={30}></IoCloseCircle>
            </div>
            <div className="bg-white p-3">
              <img
                src={message.imageUrl}
                alt="uploadImage"
                className="aspect-square w-full h-full max-w-sm m-2 object-scale-down"
              ></img>
            </div>
          </div>
        )}
        {!loading && message.videoUrl && (
          <div className="w-full h-full bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div
              className="w-fit p-2 absolute top-0 right-0 hover:text-primary cursor-pointer"
              onClick={() => {
                handleClearUploadVideo();
              }}
            >
              <IoCloseCircle size={30}></IoCloseCircle>
            </div>
            <div className="bg-white p-3">
              <video
                src={message.videoUrl}
                className="aspect-video w-full h-full max-w-sm m-2 object-scale-down"
                controls
                muted
                autoPlay
              ></video>
            </div>
          </div>
        )}
      </section>
      {/* Send Message */}
      <section className="h-16 bg-white flex items-center">
        <div className="relative">
          <div
            className="flex justify-center items-center w-11 h-11 rounded-full hover:bg-primary hover:text-white"
            onClick={() => setOpenImageVideoUpload(!openImageVideoUpload)}
          >
            <RiFileAddFill size={25} />
          </div>
          {/* video and image upload */}
          {openImageVideoUpload && (
            <div className="bg-white shadow rounded absolute bottom-10 w-36 p-2">
              <form>
                <label
                  htmlFor="uploadImage"
                  className="flex items-center p-2 gap-3 rounded hover:bg-primary hover:text-white"
                >
                  <div>
                    <FaImage size={25} />
                  </div>
                  <p>Image</p>
                </label>
                <label
                  htmlFor="uploadVideo"
                  className="flex items-center p-2 gap-3 rounded hover:bg-primary hover:text-white"
                >
                  <div>
                    <FaVideo size={25} />
                  </div>
                  <p>Viedo</p>
                </label>
                <input
                  type="file"
                  id="uploadImage"
                  onChange={(e) => handleUploadImage(e)}
                  className="hidden"
                />
                <input
                  type="file"
                  id="uploadVideo"
                  onChange={(e) => handleUploadVideo(e)}
                  className="hidden"
                />
              </form>
            </div>
          )}
        </div>
        <form
          className="h-full w-full flex gap-2"
          onSubmit={(e) => handleSendMessage(e)}
        >
          <input
            type="text"
            placeholder="Type message here..."
            className=" py-1 px-4 outline-none w-full h-full"
            name="text"
            value={message.text}
            onChange={(e) => handleOnChangeMessage(e)}
          />
          <button className="hover:text-primary">
            <MdSend size={30} />
          </button>
        </form>
      </section>
    </div>
  );
};

export default MessagePage;
