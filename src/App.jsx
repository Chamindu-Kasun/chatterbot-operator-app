import Messenger from "./components/Messenger/Messenger";
import { Route, Switch, Redirect, BrowserRouter as  Router } from "react-router-dom";
import Register from "./components/Register/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./components/Login/Login";
import "./App.css"

function App (){
    const { user } = useContext(AuthContext);
    return (
        <Router>
                <Switch>
                    <Route exact path="/">
                        {user ? <Messenger/> :  <Register/>}
                    </Route>
                    <Route exact path="/register">
                        {user ? <Redirect to="/" /> : <Register />}
                    </Route>
                    <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
                </Switch>
        </Router>
    );
}

export default App;