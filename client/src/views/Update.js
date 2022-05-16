import {useEffect, useState} from "react";
import axios from "axios";
import PirateForm from "../components/PirateForm/PirateForm";
import {Link} from "react-router-dom";

const Update = props => {
    const [pirate, setPirate] = useState({});
    const [loading, setLoading] = useState(true);
    //Create an array to store errors from the API
    const [errors, setErrors] = useState([]);
    const cancelCallback = () => props.history.push('/pirates')

    // buscar el pirata a actualizar
    useEffect(() => {
        const config = {
            headers: {
                'api-token': localStorage.getItem('token')
            }
        }
        axios.get('http://localhost:8000/api/pirates/read/' + props.match.params.id, config)
            .then(response => {
                console.log("Update:22: response.data =", response.data);
                setPirate(response.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    const updatePirate = pirate => {
        const config = {
            headers: {
                'api-token': localStorage.getItem('token')
            }
        }
        //hacer una petición PUT para actualizar un pirata específico
        axios.put('http://localhost:8000/api/pirates/update/' + props.match.params.id, pirate, config)
            .then(() => props.history.push('/pirates'))
            .catch(err => {
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            });
    }

    return (
        <>
            <Link to='/pirates'>Crew Board</Link>
            {
                loading ? <h2>Loading...</h2> : <PirateForm errors={errors} doCancel={cancelCallback}
                                                            onSubmitProperty={updatePirate}
                                                            initialName={pirate.name} initialUrl={pirate.url}
                                                            initialTreasure={pirate.treasure}
                                                            initialPhrase={pirate.phrase}
                                                            initialPosition={pirate.position} initialLeg={pirate.leg}
                                                            initialPatch={pirate.patch} initialHook={pirate.hook}
                                                            formTitle="Edit Pirate" />
            }
        </>
    )
}

export default Update;
