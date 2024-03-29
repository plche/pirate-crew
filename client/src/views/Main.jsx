import PirateList from "../components/PirateList/PirateList.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

const Main = props => {
    const [pirates, setPirates] = useState([]);
    const [loading, setLoading] = useState(true);

    const logout = () => {
        localStorage.removeItem('token');
        props.history.push('/login');
    }

    // obtenemos todas los autores desde nuestra base de datos, solo una vez se ejecuta: al montarse el componente
    useEffect(() => {
        const config = {
            headers: {
                'api-token': localStorage.getItem('token')
            }
        }
        console.log("Main:22: config.headers['api-token'] =", config.headers['api-token']);
        axios.get('http://localhost:8000/api/pirates/read/all', config)
            .then(response => {
                setPirates(response.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    const removeFromDOM = pirateId => setPirates(pirates.filter(pirate => pirate._id !== pirateId));

    return (
        <>
            {/*<Link to='/pirate/new'>Add Pirate</Link>*/}
            <button onClick={() => props.history.push('/pirate/new')}>Add Pirate</button>
            {
                loading ? <h2>Loading...</h2> : (pirates.length !== 0) && <PirateList pirates={pirates}
                                                                                      removeFromDOM={removeFromDOM} />
            }
            <p><button onClick={logout}>Logout</button></p>
        </>
    );
}

export default Main;
