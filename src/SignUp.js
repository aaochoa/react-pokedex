import React, { useCallback } from "react"
import { Link } from 'react-router-dom'
import { withRouter } from "react-router"
import app from "./base"

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault()
    const { name, email, password, confirmation } = event.target.elements
    if (password.value.match(passRegex)) {
      if(password.value === confirmation.value) {
        try {
          await app.auth().createUserWithEmailAndPassword(email.value, password.value)
          app.auth().currentUser.updateProfile({
            displayName: name.value
          })
          history.push("/")
        } catch (error) {
          alert(error)
        }
      } else alert('Las contraseñas no coinciden.');
    } else alert("La contraseña debe ser mínimo de 8 caracteres\n y contener un caracter especial (@$!%*?&), un númeno y una letra mayuscula.")
  }, [history])

  return (
    <div className="card text-white bg-danger mb-3 mx-auto" style={{height: 'auto', maxWidth: '30rem'}}>
      <div className="card-body mx-auto">
        <h5 className="card-title">Sign Up</h5>
        <form className="card-text" onSubmit={handleSignUp} style={{marginBottom: '0.5rem'}}>
          <div className="form-group">
            <label htmlFor="fullName">Name</label>
            <input className="form-control" name="name" type="text" placeholder="Trainers Name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input className="form-control" name="email" type="email" placeholder="Email" onChange={e => onChangeEmail(e)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input className="form-control" name="password" type="password" placeholder="Password" onChange={e => onChangePass(e)} />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input className="form-control" name="confirmation" type="password" placeholder="Confirm Password" onChange={e => onChangePass(e)} />
          </div>
          <button className="btn btn-light" type="submit">Sign Up</button>
        </form>
        <Link to="/login" className="btn btn-light">Log In</Link>
      </div>
    </div>
  )
}

const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const onChangeEmail = (e) => {
  if (e.target.value.match(emailRegex)) e.target.style.background = 'lightgreen' 
  else e.target.style.background = 'wheat'
}

const onChangePass = (e) => {
  if (e.target.value.match(passRegex)) e.target.style.background = 'lightgreen'
  else e.target.style.background = 'wheat'
}

export default withRouter(SignUp);
