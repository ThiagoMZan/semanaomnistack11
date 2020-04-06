const express = require('express');

const IncidentController = require('./controllers/IncidentController');
const SessionController = require('./controllers/SessionController');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/incidents', IncidentController.select);
routes.post('/incidents', IncidentController.insert);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/users', UserController.select);
routes.get('/users/incidents', UserController.selectIncidents);
routes.post('/users', UserController.insert);

module.exports = routes;