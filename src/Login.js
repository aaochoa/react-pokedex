import React, { useCallback, useContext } from "react"
import { withRouter, Redirect } from "react-router"
import { Link } from 'react-router-dom'
import app from "./base.js"
import { AuthContext } from "./Auth.js"

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="card text-white bg-danger mb-3 mx-auto" style={{height: 'auto', maxWidth: '30rem'}}>
      <div className="card-body mx-auto">
        <h5 className="card-title">Log In</h5>
        <form className="card-text" onSubmit={handleLogin} style={{marginBottom: '0.5rem'}}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input name="email" type="email" placeholder="Email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input name="password" type="password" placeholder="Password" />
          </div>
          <button className="btn btn-light" type="submit">Log in</button>
        </form>
        <Link to="/signup" className="btn btn-light">Register</Link>
      </div>
    </div>
  );
};

export default withRouter(Login);
