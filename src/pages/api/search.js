import axios from "axios";

export default async function handler(req, res) {
  const { q } = req.query;

  try {
    const response = await axios.get(
      `https://api.github.com/search/users?q=${q}&per_page=20`
    );
    const users = response.data.items;
    const userRequests = users.map((user) =>
      axios.get(`https://api.github.com/users/${user.login}`)
    );
    const userData = await Promise.all(userRequests);
    const userProfiles = userData.map((response) => response.data);
    res.status(200).json(userProfiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
