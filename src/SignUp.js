import React, { useCallback } from "react"
import { Link } from 'react-router-dom'
import { withRouter } from "react-router"
import app from "./base"

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app.auth().createUserWithEmailAndPassword(email.value, password.value)
      history.push("/")
    } catch (error) {
      alert(error)
    }
  }, [history])

  return (
    <div className="card text-white bg-danger mb-3 mx-auto" style={{height: 'auto', maxWidth: '30rem'}}>
      <div className="card-body mx-auto">
        <h5 className="card-title">Sign Up</h5>
        <form className="card-text" onSubmit={handleSignUp} style={{marginBottom: '0.5rem'}}>
          <div className="form-group">
            <label htmlFor="fullName">Name</label>
            <input className="form-control" name="fullName" type="text" placeholder="Trainers Name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input className="form-control" name="email" type="email" placeholder="Email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input className="form-control" name="password" type="password" placeholder="Password" />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Password</label>
            <input className="form-control" name="confirmPassword" type="password" placeholder="Confirm Password" />
          </div>
          <button className="btn btn-light" type="submit">Sign Up</button>
        </form>
        <Link to="/login" className="btn btn-light">Log In</Link>
      </div>
    </div>
  );
};

export default withRouter(SignUp);
