import {useState} from "react";

const PiraterForm = props => {
    // desestructuramos las props
    const {errors, doCancel, onSubmitProperty, initialName, initialUrl, initialTreasure, initialPhrase,
        initialPosition, initialLeg, initialPatch, initialHook, formTitle} = props;
    // mantener el control de lo que se escribe a través del gancho useState
    const [name, setName] = useState(initialName);
    const [url, setUrl] = useState(initialUrl);
    const [treasure, setTreasure] = useState(initialTreasure);
    const [phrase, setPhrase] = useState(initialPhrase);
    const [position, setPosition] = useState(initialPosition);
    const [leg, setLeg] = useState(initialLeg);
    const [patch, setPatch] = useState(initialPatch);
    const [hook, setHook] = useState(initialHook);
    //gestor cuando se envía el formulario
    const onSubmitHandler = event => {
        //evitar el comportamiento por defecto de submit
        event.preventDefault();
        // Invocamos una función que maneja tanto la creación como la actualización. La diferencia entre ambos casos,
        // es manejado por una propiedad.
        onSubmitProperty({name, url, treasure, phrase, position, leg, patch, hook});
    }
    //onChange para actualizar name
    return (
        <>
            <h1>{formTitle}</h1>
            <form onSubmit={onSubmitHandler}>
                {errors.map((error, index) => <p key={'error' + index}>{error}</p>)}
                <p>
                    <label>Pirate Name: </label>
                    <input type="text" name="name" value={name}
                           onChange = {event => setName(event.target.value)} />
                </p>
                <p>
                    <label>Image URL: </label>
                    <input type="text" name="url" value={url}
                           onChange = {event => setUrl(event.target.value)} />
                </p>
                <p>
                    <label># of Treasure Chests: </label>
                    <input type="number" name="treasure" value={treasure}
                           onChange = {event => setTreasure(Number(event.target.value))} />
                </p>
                <p>
                    <label>Pirate Catch Phrase: </label>
                    <input type="text" name="phrase" value={phrase}
                           onChange = {event => setPhrase(event.target.value)} />
                </p>
                <p>
                    <label>Crew Position: </label>
                    <select name="position" onChange = {event => setPosition(event.target.value)}>
                        <option value="Captain">Captain</option>
                        <option value="First Mate">First Mate</option>
                        <option value="Quarter Master">Quarter Master</option>
                        <option value="Boatswain">Boatswain</option>
                        <option value="Powder Monkey">Powder Monkey</option>
                    </select>
                </p>
                <p>
                    <label>Peg Leg </label>
                    <input type="checkbox" name="leg" value="Peg Leg" checked={leg}
                           onChange = {() => setLeg(!leg)} />
                </p>
                <p>
                    <label>Eye Patch </label>
                    <input type="checkbox" name="patch" value="Eye Patch" checked={patch}
                           onChange = {() => setPatch(!patch)} />
                </p>
                <p>
                    <label>Hook Hand </label>
                    <input type="checkbox" name="hook" value="Hook Hand" checked={hook}
                           onChange = {() => setHook(!hook)} />
                </p>
                <button onClick={doCancel}>Cancel</button>
                <input type="submit" value={formTitle} />
            </form>
        </>
    )
}

export default PiraterForm;
