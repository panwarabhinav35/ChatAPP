const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`;

export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "chat-app-file");
    const response = await fetch(url, {
      body: formData,
      method: "POST",
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.log(error);
  }
};
