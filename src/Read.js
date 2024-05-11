import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Read() {
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error('Error fetching user data:', err));
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h3>Details of User</h3>
      <div>
        <strong>Name: {data.name}</strong>
      </div>
      <div>
        <strong>Email: {data.email}</strong>
      </div>
      <div>
        <strong>Phone: {data.phone}</strong>
      </div>
      <div>
        <Link to={`/update/${id}`} className="btn btn-primary me-2">Edit</Link>
        <Link to="/" className="btn btn-secondary">Back</Link>
      </div>
    </div>
  );
}

export default Read;
