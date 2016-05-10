var React = require('react'),
    WorkoutRoutine = require('./WorkoutRoutine'),
    WorkoutForm = require('./WorkoutForm'),
    WeightsStore = require('../stores/WeightsStore'),

    Workout = React.createClass({
        getInitialState () {
            return WeightsStore.getWorkoutStates();
        },

        componentDidMount () {
            WeightsStore.addChangeListener(this.handleStoreChange);
        },

        componentWillUnmount () {
            WeightsStore.removeChangeListener(this.handleStoreChange);
        },

        handleStoreChange () {
            this.setState(WeightsStore.getWorkoutStates());
        },

        render () {
            return (
                <div className="workout">
                    <WorkoutForm />
                    <WorkoutRoutine
                        rmWeight={this.state.rmWeight}
                        allowedIncrements={this.state.allowedIncrements}
                    />
                </div>
            );
        }
    });

module.exports = Workout;
