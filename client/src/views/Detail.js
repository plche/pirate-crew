import {useEffect, useState} from "react";
import axios from "axios";

const Detail = props => {
    const [pirate, setPirate] = useState({});
    const styleTable = {marginLeft: "auto", marginRight: "auto"}
    const styleImage = {width: "220px"}

    const deletePirate = (pirateId) => {
        const config = {
            headers: {
                'api-token': localStorage.getItem('token')
            }
        }
        axios.delete('http://localhost:8000/api/pirates/delete/' + pirateId, config)
            .then(response => {
                console.log(response);
                props.history.push('/pirates');
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        const config = {
            headers: {
                'api-token': localStorage.getItem('token')
            }
        }
        axios.get('http://localhost:8000/api/pirates/read/' + props.match.params.id, config)
            .then(response => setPirate(response.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <button onClick={() => props.history.push('/pirates')}>Crew Board</button>
            <h1>{pirate.name}</h1>
            <img style={styleImage} src={pirate.url} alt={pirate.name}/>
            <h1>"{pirate.phrase}"</h1>
            <hr/>
            <h1>About</h1>
            <table style={styleTable}>
                <tbody>
                    <tr>
                        <td>Position:</td>
                        <td>{pirate.position}</td>
                    </tr>
                    <tr>
                        <td>Treasures:</td>
                        <td>{pirate.treasure}</td>
                    </tr>
                    <tr>
                        <td>Peg Leg:</td>
                        <td>{pirate.leg ? "Yes" : "No"} | <button>{pirate.leg ? "NO" : "YES"}</button></td>
                    </tr>
                    <tr>
                        <td>Eye Patch:</td>
                        <td>{pirate.patch ? "Yes" : "No"} | <button>{pirate.patch ? "NO" : "YES"}</button></td>
                    </tr>
                    <tr>
                        <td>Hook Hand:</td>
                        <td>{pirate.hook ? "Yes" : "No"} | <button>{pirate.hook ? "NO" : "YES"}</button></td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <button onClick={() => props.history.push('/pirate/' + pirate._id + '/edit')}>
                Edit
            </button> | <button onClick={() => deletePirate(pirate._id)}>Delete</button>
        </>
    );
}

export default Detail;
