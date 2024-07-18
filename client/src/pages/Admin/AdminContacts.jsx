import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminContacts() {
  const [contacts, setContacts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllInfos = async () => {
      try {
        const contactResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/contacts`
        );

        setContacts(contactResponse.data);
      } catch (error) {
        console.error("Error fetching contact :", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchAllInfos();
  }, []);

  console.info(contacts);

  if (loading) return <p>Chargement...</p>;

  if (!contacts) return <p> Pas de demande de contact</p>;

  return (
    <div className="contact-contacts">
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
      <h1>Mes demandes de contacts</h1>
      <ul className="admin-list">
        {contacts.map((contact) => (
          <li key={contact.id} className="admin-item-2">
            <div className="contact-header">
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.59 1.322l2.844-1.322 4.041 7.889-2.724 1.342c-.538 1.259 2.159 6.289 3.297 6.372.09-.058 2.671-1.328 2.671-1.328l4.11 7.932s-2.764 1.354-2.854 1.396c-.604.276-1.228.402-1.862.397-5.678-.043-12.143-10.564-12.113-17.454.011-2.351.777-4.279 2.59-5.224zm1.93 1.274l-1.023.504c-5.294 2.762 4.177 21.185 9.648 18.686l.972-.474-2.271-4.383-1.026.501c-3.163 1.547-8.262-8.219-5.055-9.938l1.007-.498-2.252-4.398zm8.98 6.404c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm9 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm-4.5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"
                  fill="#8c034e"
                />
              </svg>
              <h2>{contact.animal_name}</h2>
              <span className="contact-date">
                {new Date(contact.request_date).toLocaleDateString()}
              </span>
            </div>
            <div className="contact-body">
              <p>
                <strong>Contact :</strong> {contact.firstname}{" "}
                {contact.lastname}
              </p>
              <p>
                <strong>Email :</strong> {contact.email}
              </p>
              <p>
                <strong>Téléphone :</strong> {contact.telephone}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminContacts;
