const express = require('express');
const PirateRouter = express.Router();
const PirateController = require('../controllers/pirate.controller');

PirateRouter.get('/read/all', PirateController.readAllPirates);
PirateRouter.get('/read/:id', PirateController.readOneSinglePirate);
PirateRouter.post('/create', PirateController.createPirate);
PirateRouter.put('/update/:id', PirateController.updateExistingPirate);
PirateRouter.delete('/delete/:id', PirateController.deleteAnExistingPirate);

module.exports = PirateRouter;
