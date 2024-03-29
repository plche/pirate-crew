import {Route, Routes} from "react-router-dom";
import './App.css';
import Main from "./views/Main.jsx";
import Detail from "./views/Detail.jsx";
import Update from "./views/Update.jsx";
import Create from "./views/Create.jsx";
import Register from "./views/Register.jsx";
import Login from "./views/Login.jsx";
import {useState} from "react";
import axios from "axios";
import LoginFirst from "./views/LoginFirst.jsx";

const App = props => {
    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const registerUser = event => {
        event.preventDefault();
        const newUser = {
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            email: event.target.email.value,
            password: event.target.password.value,
            confirmPassword: event.target.confirmPassword.value
        }

        axios.post('http://localhost:8000/api/users/register', newUser)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                setErrorMsg('');
                props.history.push('/pirates');
            })
            .catch(err => setErrorMsg(err.response.statusText));
    };

    const loginUser = event => {
        event.preventDefault();

        const user = {
            email: event.target.email.value,
            password: event.target.password.value
        }

        axios.post('http://localhost:8000/api/users/login', user)
            .then(response => {
                setEmail(user.email);
                console.log("Login:17: response.data =", response.data);
                localStorage.setItem('token', response.data.token);
                setErrorMsg('');
                props.history.push('/pirates');
            })
            .catch(err => setErrorMsg(err.response.statusText));
    };

    const authorize = () => {
        const config = {
            headers: {
                'api-token': localStorage.getItem('token')
            }
        }
        axios.post('http://localhost:8000/api/users/authorize', {}, config)
            .then(response => setEmail(response.data.email))
            .catch(err => {
                console.log("App:63: err.response.statusText =", err.response.statusText);
                // redirect to...?
            });
    };

    return (
        <div className="App">
            <h1>Welcome to Pirate Crew</h1>
            <Routes>
                <Route path='/register' element={<Register registerUser={registerUser} />} />
                <Route path='/login' element={<Login loginUser={loginUser} />} />
                <Route path='/pirate/:id/edit'>
                    {authorize()}
                    {email !== '' ? <Update /> : <LoginFirst />}
                </Route>
                <Route path='/pirate/new'>
                    {authorize()}
                    {email !== '' ? <Create /> : <LoginFirst />}
                </Route>
                <Route path='/pirate/:id'>
                    {authorize()}
                    {email !== '' ? <Detail /> : <LoginFirst />}
                </Route>
                <Route path='/pirates'>
                    {authorize()}
                    {email !== '' ? <Main /> : <LoginFirst />}
                </Route>
            </Routes>
            <div>
                {errorMsg}
            </div>
        </div>
    );
}

export default App
