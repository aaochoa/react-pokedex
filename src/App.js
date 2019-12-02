import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from "./Home"
import Pokemon from "./pokemon/Pokemon"
import NavBar from "./NavBar"
import Login from "./Login"
import SignUp from "./SignUp"
import backgroundImage from './pattern.jpg'
import { AuthProvider } from "./Auth"
import PrivateRoute from "./PrivateRoute"

const App = () => {
  return (
    <AuthProvider>
      <div className="App" id="appContainer" style={{background: `url(${backgroundImage})`}}>
        <Router>
          <NavBar />
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
        </Router>
      </div>
    </AuthProvider>
  )
}

export default App;
