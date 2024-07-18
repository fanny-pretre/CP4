import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminUtilisateurs() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstname} ${user.lastname} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users`
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className="admin-section">
      <div className="previous">
        <Link to="/admin">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M17.026 22.957c10.957-11.421-2.326-20.865-10.384-13.309l2.464 2.352h-9.106v-8.947l2.232 2.229c14.794-13.203 31.51 7.051 14.794 17.675z" />
          </svg>
        </Link>
      </div>
      <h1>Liste des utilisateurs</h1>
      <ul className="admin-list">
        <input
          type="text"
          placeholder="Rechercher des utilisateurs"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />
        {filteredUsers.map((user) => (
          <li className="admin-item-2" key={user.id}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z"
                fill="#8c034e"
              />
            </svg>

            <div className="admin-animals-infos">
              <h3>
                {" "}
                {user.firstname} {user.lastname}{" "}
              </h3>
              <p>{user.email} </p>
              <p>{user.telephone} </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminUtilisateurs;
