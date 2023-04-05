/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import ModelView from "@/components/ModelView";
import { Icon } from "@iconify/react";

const Index = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (query.trim() === "") {
      setError("please enter a value");
      setUsers([]);
      return;
    }
    setError("");

    const response = await axios.get(`/api/search?q=${query}`);
    setUsers(response.data);
  };

  return (
    <div>
      <main className="w-full  relative z-10 mx-auto   flex flex-col items-center">
        <div className=" w-full px-3 max-w-7xl ">
          <div className="w-full  flex-col  flex items-center">
            <div className="w-11/12">
              <h1 className="mt-10 text-5xl font-bold">
                <Icon icon="mdi:github" />
                <div className="h-4"></div>
                GitHub Profile Search
              </h1>
            </div>

            <form
              className=" w-11/12 mt-12 text-gray-900 text-2xl "
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
                  className=" hover:bg-purple-400 bg-violet-300 rounded-full aspect-square h-12 w-12 "
                  type="submit"
                >
                  🔍
                </button>
              </div>
            </form>
            <div className=" w-11/12">
              <p className=" text-gray-400 opacity-60 mt-2 text-xs self-start">
                Press enter to search or click the search icon{" "}
              </p>
            </div>
          </div>

          {error && (
            <div className="w-full flex justify-center items-center">
              <div className="w-11/12 mt-5">
                <p className="text-gray-400 opacity-60 text-sm self-start">
                  please enter a value
                </p>
              </div>
            </div>
          )}

          {users.length > 0 ? (
            <div className="w-full flex items-center justify-center mt-5 ">
              <div className="w-11/12   grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-wrap justify-center gap-3">
                {users.map((user) => (
                  <div key={user.id}>
                    <div className="  h-full     rounded  mb-4  ">
                      <div className="h-20 w-full relative z-0 bg-gray-300 bg-opacity-40 backdrop-blur-lg   rounded-tr-lg  rounded-tl-lg  flex" />
                      <div className="w-full flex items-center justify-center relative z-10 -mt-10">
                        <Link href={user.html_url} target="_blank">
                          <img
                            className="w-20 h-20 aspect-square rounded-full hover:border-4 border-2 hover:border-purple-400  border-gray-800  "
                            src={user.avatar_url}
                            alt={`${user.login}'s avatar`}
                          />
                        </Link>
                      </div>
                      <div className="bg-gray-200 relative rounded-b-lg rounded-bl-lg -mt-10">
                        <div className="h-12"></div>
                        <div className="w-full flex flex-col items-center ">
                          <Link href={user.html_url} target="_blank">
                            <h3 className="text-gray-800 hover:text-purple-800  text-lg font-bold">
                              {user.login}
                            </h3>
                          </Link>
                          <p className=" -mt-1 text-sm text-gray-700">
                            {user.name || "Name Not Public"}
                          </p>
                          <div className=" flex gap-2 mt-3 w-11/12 mb-4 items-center text-violet-800  justify-between">
                            <div className="flex flex-col justify-center align-middle items-center">
                              <span> {user.followers || "0"}</span>
                              <span>Followers</span>
                            </div>
                            <div className="  w-1 border-r border-black  h-9"></div>
                            <div className="flex flex-col justify-center align-middle items-center">
                              <span> {user.following || "0"}</span>
                              <span>Following</span>
                            </div>
                            <div className="  w-1 border-r border-black  h-9"></div>
                            <div className="flex flex-col justify-center align-middle items-center">
                              <span> {user.public_repos || "0"}</span>
                              <span>Public Repos</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center items-center">
              <div className="w-11/12 mt-32 flex flex-col items-center">
                <Icon icon="typcn:social-github" width={150} />

                <p className="text-gray-400  text-sm ">
                  No Users found Search to find more users
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      <div className=" pointer-events-none top-0 z-0 fixed w-full h-screen">
        <ModelView />
        <div className="graincontain">
          <div
            style={{ backgroundImage: `url(/grain.png)` }}
            className="bg-container  pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
