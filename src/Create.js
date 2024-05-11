import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Create() {
  const [values, setValues] = useState({ name: '', email: '', phone: '' });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('https://jsonplaceholder.typicode.com/users/', values)
      .then((res) => {
        console.log('User created:', res.data);
        navigate('/');
      })
      .catch((err) => {
        console.error('Error creating user:', err);
        alert('Failed to create user. Please try again.');
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-secondary text-white">
            <div className="card-header">
              <h3 className="card-title mb-0">Add New User</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name:</label>
                  <input type="text" name="name" className="form-control" placeholder="Enter name" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input type="email" name="email" className="form-control" placeholder="Enter Email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone:</label>
                  <input type="text" name="phone" className="form-control" placeholder="Enter Phone" value={values.phone} onChange={(e) => setValues({ ...values, phone: e.target.value })} />
                </div>
                <button type="submit" className="btn btn-info me-2">Submit</button>
                <Link to="/" className="btn btn-secondary">Back</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
