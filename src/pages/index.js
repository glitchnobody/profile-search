/* eslint-disable @next/next/no-img-element */
import Head from "next/head";

import { useState } from "react";
import axios from "axios";

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
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a username, name, or email..."
        />
        <button type="submit">Search</button>
      </form>
      {users.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          {users.map((user) => (
            <div key={user.id}>
              <h3>{user.login}</h3>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.location}</p>
              <p>{user.websiteUrl}</p>
              <p>{user.bio}</p>
              <p>Followers: {user.followers}</p>
              <p>Following: {user.following}</p>
              <p>Public Repositories: {user.public_repos}</p>
              <img src={user.avatar_url} alt={`${user.login}'s avatar`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;
