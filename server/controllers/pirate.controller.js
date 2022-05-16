const Pirate = require('../models/pirate.model');

const readAllPirates = (request, response) => {
    Pirate.find().sort({name: 1})
        .then(allPirates => response.status(200).json(allPirates))
        .catch(err => {
            response.statusMessage = `Hubo un error al ejecutar la búsqueda: ${err}`;
            return response.status(400).end();
        });
}

const readOneSinglePirate = (request, response) => {
    Pirate.findOne({_id: request.params.id})
        .then(oneSinglePirate => response.status(200).json(oneSinglePirate))
        .catch(err => {
            response.statusMessage = `Hubo un error al ejecutar la búsqueda: ${err}`;
            return response.status(400).end();
        });
}

const createPirate = (request, response) => {
    Pirate.create(request.body)
        .then(createdPirate => response.status(201).json(createdPirate))
        .catch(err => {
            response.statusMessage = `Hubo un error al ejecutar el insert: ${err}`;
            return response.status(400).json(err);
        });
}

const updateExistingPirate = (request, response) => {
    const options = {new: true, runValidators: true}
    Pirate.findOneAndUpdate({_id: request.params.id}, {$set: request.body}, options)
        .then(updatedPirate => response.status(202).json(updatedPirate))
        .catch(err => {
            response.statusMessage = `Hubo un error al ejecutar la actualización: ${err}`;
            return response.status(400).json(err);
        });
}

const deleteAnExistingPirate = (request, response) => {
    Pirate.deleteOne({_id: request.params.id})
        .then(result => response.status(204).json(result))
        .catch(err => {
            response.statusMessage = `Hubo un error al ejecutar la eliminación: ${err}`;
            return response.status(400).end();
        });
}

const PirateController = {
    readAllPirates,
    readOneSinglePirate,
    createPirate,
    updateExistingPirate,
    deleteAnExistingPirate
}

module.exports = PirateController;
