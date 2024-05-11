import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Would you like to delete this user?');
    if (confirmDelete) {
      axios
        .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(() => {
          setData((prevData) => prevData.filter((user) => user.id !== id));
        })
        .catch((err) => {
          console.error('Error deleting user:', err);
        });
    }
  };

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users/')
      .then((res) => setData(res.data))
      .catch((err) => console.error('Error fetching users:', err));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">List of Users</h1>
      <div className="d-flex justify-content-end mb-3">
        <Link to="/create" className="btn btn-primary">Add New User</Link>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <Link to={`/read/${user.id}`} className="btn btn-info me-2">Read</Link>
                  <Link to={`/update/${user.id}`} className="btn btn-warning me-2">Update</Link>
                  <button onClick={() => handleDelete(user.id)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
