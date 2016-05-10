var React = require('react'),
    { Router, hashHistory } = require('react-router'),
    routes = require('./config/routes'),
    WeightsApp = require('./components/WeightsApp');

React.render(<Router routes={routes} history={hashHistory}/>, document.getElementById('weightsapp'));
