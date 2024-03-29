import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import DeleteButton from "../DeleteButton/DeleteButton.jsx";

const PirateList = props => {
    const [pirates, setPirates] = useState([]);
    const styleTable = {marginLeft: "auto", marginRight: "auto"}
    const styleImage = {width: "120px"}

    // obtenemos todas los piratas desde nuestra base de datos, solo una vez se ejecuta: al montarse el componente
    useEffect(() => {
        const config = {
            headers: {
                'api-token': localStorage.getItem('token')
            }
        }
        axios.get('http://localhost:8000/api/pirates/read/all', config)
            .then(response => {
                setPirates(response.data);
            })
            .catch(err => console.error(err));
    }, []);

    const removeFromDOM = pirateId => setPirates(pirates.filter(pirate => pirate._id !== pirateId));

    return (
        <>
            <h1>Pirate Crew</h1>
            <table style={styleTable}>
                <thead>
                    <tr>
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {pirates.map((pirate, idx) => <tr key={'pirate_' + idx}>
                            <td><img style={styleImage} src={pirate.url} alt={pirate.name} /></td>
                            <td>
                                <Link to={'/pirate/' + pirate._id}>{pirate.name}</Link>
                            </td>
                            <td>
                                {/*<Link to={'/pirate/' + pirate._id + '/edit'}>
                                    Edit Pirate
                                </Link> | <DeleteButton pirateId={pirate._id}
                                                        successCallback={() => removeFromDOM(pirate._id)} />*/}
                                <button onClick={() => props.history.push('/pirate/' + pirate._id)}>
                                    View Pirate</button> | <button
                                    onClick={() => props.history.push('/pirate/' + pirate._id + '/edit')}>
                                    Edit Pirate
                                </button> | <DeleteButton pirateId={pirate._id}
                                                        successCallback={() => removeFromDOM(pirate._id)} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default PirateList;
