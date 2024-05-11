import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: '', email: '', phone: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        setValues(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching user data:', err);
        setIsLoading(false);
      });
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();

    axios
      .put(`https://jsonplaceholder.typicode.com/users/${id}`, values)
      .then((res) => {
        console.log('User updated:', res.data);
        navigate('/');
      })
      .catch((err) => {
        console.error('Error updating user:', err);
        alert('Failed to update user. Please try again.');
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <form onSubmit={handleUpdate}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter name"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Enter Phone"
              value={values.phone}
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
            />
          </div>
          <br />
          <button type="submit" className="btn btn-info">Update</button>
          <Link to="/">
            <button type="button" className="btn btn-secondary">Back</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Update;
