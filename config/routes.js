var React = require('react'),
    { Route, IndexRoute } = require('react-router'),
    WeightsApp = require('../components/WeightsApp'),
    Calculator = require('../components/Calculator'),
    Workout = require('../components/Workout');


module.exports = (
    <Route path="/" component={WeightsApp}>
        <IndexRoute component={Calculator}/>
        <Route path="/workout" component={Workout}/>
    </Route>
)
