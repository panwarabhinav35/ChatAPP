import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import Loading from "./Loading";
import UserSearchCard from "./UserSearchCard";

const SearchUser = ({ setOpenSearchUser }) => {
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const handleSearchUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/search`,
        {
          method: "POST",
          body: JSON.stringify({ searchedText }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const responseData = await response.json();
      setSearchUser(responseData.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleSearchUser();
  }, [searchedText]);
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-2">
      <div className="w-full max-w-lg mx-auto mt-10">
        <div className="bg-white rounded h-14 overflow-hidden flex">
          <input
            type="text"
            placeholder="Search user by name, email....."
            className="w-full outline-none py-1 h-full px-4"
            value={searchedText}
            onChange={(e) => setSearchedText(e.target.value)}
          />
          <div className="h-14 w-14 flex justify-center items-center">
            <GoSearch size={25} />
          </div>
        </div>
        {/* display search results */}
        <div className="bg-white mt-2 w-full p-4 rounded">
          {/* no user found */}
          {searchUser.length === 0 && !loading && (
            <p className="text-center text-slate-500">No user Found</p>
          )}
          {loading && <Loading />}
          {searchUser.length !== 0 &&
            !loading &&
            searchUser.map((user, index) => (
              <div key={index} onClick={() => setOpenSearchUser(false)}>
                <UserSearchCard user={user}  />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
