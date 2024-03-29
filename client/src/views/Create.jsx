import {useState} from "react";
import axios from "axios";
import PirateForm from "../components/PirateForm/PirateForm.jsx";

const Create = props => {
    //Create an array to store errors from the API
    const [errors, setErrors] = useState([]);
    const cancelCallback = () => props.history.push('/pirates')

    const createPirate = pirate => {
        const config = {
            headers: {
                'api-token': localStorage.getItem('token')
            }
        }
        //hacer una petición POST para crear un nuevo pirata y agregarlo a la lista de piratas
        axios.post('http://localhost:8000/api/pirates/create', pirate, config)
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
            <PirateForm errors={errors} doCancel={cancelCallback} onSubmitProperty={createPirate}
                        initialName='' initialUrl='' initialTreasure={0} initialPhrase='' initialPosition='Captain'
                        initialLeg={true} initialPatch={true} initialHook={true} formTitle="Add Pirate" />
        </>
    )
}

export default Create;
