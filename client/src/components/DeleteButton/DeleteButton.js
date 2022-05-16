import axios from "axios";

const DeleteButton = props => {
    const {pirateId, successCallback} = props;
    const deletePirate = () => {
        const config = {
            headers: {
                'api-token': localStorage.getItem('token')
            }
        }
        axios.delete('http://localhost:8000/api/pirates/delete/' + pirateId, config)
            .then(() => successCallback())
            .catch(err => console.log(err));
    }
    return <button onClick={deletePirate}>Walk the Plank</button>
}

export default DeleteButton;
