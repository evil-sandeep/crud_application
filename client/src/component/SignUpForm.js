import React, { useEffect, useState } from 'react';
import './SignUpForm.css';
import Axios from 'axios';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [, setUserList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setUserList(response.data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
   
    Axios.post('http://localhost:3001/api/insert', formData)
      .then(() => {
        console.log("Success insert");
      
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        });
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
      });
  };

  return (
    <div className="signup-form-container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>

      {/* {userList.map((val) => (
        <div className="card" key={val.id}>
          <h1>{val.firstName}</h1> | <p>{val.lastName}</p>
          <p>{val.email}</p>
          <p>{val.password}</p>
        </div>
      ))} */}
    </div>
  );
};

export default SignUpForm;
