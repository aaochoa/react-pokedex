import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from "./components/layout/NavBar"
import Dashboard from "./components/layout/Dashboard"
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Pokemon from './components/pokemon/Pokemon'
import backgroundImage from './pattern.jpg'
import { AuthProvider } from "./components/Auth"
import PrivateRoute from './components/PrivateRoute'

function App() {
    return (
        <div className="App" style={{background: `url(${backgroundImage})`}} > 
            <AuthProvider>
                <Router>
                    <NavBar />
                    <div className="container">
                        <Switch>
                            <PrivateRoute exact path="/" component={Dashboard} />
                            <PrivateRoute exact path="/pokemon/:pokemonIndex" component={Pokemon} />
                            <Route exact path="/login" conponent={Login} />
                            <Route exact path="/signup" conponent={SignUp} />
                        </Switch>
                    </div>
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;
