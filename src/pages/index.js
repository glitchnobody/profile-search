/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import axios from "axios";
import ModelView from "@/components/ModelView";

const Index = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query) {
      alert("Please enter a search query.");
      return;
    }

    try {
      const response = await axios.get(`/api/search?q=${query}`);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
      alert("An error occurred while searching. Please try again.");
    }
  };

  return (
    <div>
      <main className="w-full  relative z-10 mx-auto   flex flex-col items-center">
        <div className=" w-full px-3 max-w-7xl ">
          <div className="w-full  flex-col  flex items-center">
            <form
              className=" w-11/12 mt-32 text-violet-900 text-2xl "
              onSubmit={handleSearch}
            >
              <div className="flex px-2  rounded-md bg-gray-200 justify-center  align-middle items-center  h-fit">
                <input
                  className="w-full px-2 h-14  bg-transparent  rounded-lg text-2xl placeholder:text-sm focus:outline-none"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter a username, name, or email"
                />
                <button
                  className=" hover:bg-violet-200 rounded-full aspect-square h-12 w-12 "
                  type="submit"
                >
                  🔍
                </button>
              </div>
            </form>
            <div className=" w-11/12">
              <p className=" text-blue-400 opacity-60 mt-2 text-xs self-start">
                Press enter to search or click the search icon{" "}
              </p>
            </div>
          </div>

          {users.length > 0 && (
            <div className="w-full ">
              <h2 className=" w-11/12 mx-auto text-slate-100 text-4xl my-5">
                Search Results:
              </h2>
              {users.map((user) => (
                <div
                  className="w-11/12 mx-auto mb-5 rounded-md border border-purple-500 h-40 p-3 flex flex-wrap bg-opacity-30   backdrop-blur-md  bg-blue-400"
                  key={user.id}
                >
                  <img
                    className="w-20 h-20 rounded-full mr-4"
                    src={user.avatar_url}
                    alt={`${user.login}'s avatar`}
                  />
                  <h3>{user.login}</h3>
                  <p>{user.name || "Not Public"}</p>
                  <p>{user.email || "Not Public"}</p>
                  <p>{user.location || "Not Public"}</p>
                  <p>{user.websiteUrl || "Not Public"}</p>
                  <p>{user.bio || "Not Public"}</p>
                  <p>Followers: {user.followers || "0"}</p>
                  <p>Following: {user.following || "0"}</p>
                  <p>Public Repositories: {user.public_repos || "0"}</p>
                </div>
              ))}
            </div>
          )}
          {users.length === 0 && (
            <div className="w-full ">
              <h2 className=" w-11/12 mx-auto text-slate-100 text-4xl my-5">
                No results found
              </h2>
            </div>
          )}
        </div>
      </main>
      <div className=" top-0 z-0 fixed w-full h-screen">
        <ModelView />
        <div className="graincontain">
          <div
            style={{ backgroundImage: `url(/grain.png)` }}
            className="bg-container"
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
