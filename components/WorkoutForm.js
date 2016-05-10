var React = require('react'),
    isEmpty = require('lodash/fp/isEmpty'),
    WorkoutActions = require('../actions/WorkoutActions'),
    WeightsStore = require('../stores/WeightsStore'),
    forEach = require('lodash/forEach'),

    WorkoutForm = React.createClass({
        getInitialState () {
            workoutStates = WeightsStore.getWorkoutStates();

            return {
                rmWeight: workoutStates.rmWeight,
                listedIncrements: workoutStates.listedIncrements,
                allowedIncrements: workoutStates.allowedIncrements
            }
        },

        onTextChange (event) {
            var currentState = this.state;

            currentState[event.target.id] = event.target.value;
            this.setState(currentState);
        },

        onIncrementsChange (event) {
            var currentState = this.state,
                selectedIncrements = [],
                incrementInputs = document.getElementsByClassName('workout-form__percentage-increment');

            forEach(incrementInputs, (incrementInput) =>{
                if (incrementInput.checked){
                    selectedIncrements.push(parseFloat(incrementInput.value));
                }
            });

            currentState['allowedIncrements'] = selectedIncrements;
            this.setState(currentState);
        },

        onKeyDown (event) {
            // 13 === Enter Key
            if (event.keyCode === 13) {
                this.save(arguments);
            }
        },

        save (event) {
            if (isEmpty(this.state.rmWeight)) {
                return;
            }
            if (event.type === 'click') {
                event.preventDefault();
            }

            WorkoutActions.evalWorkout(this.state);
        },

        render () {
            return (
                <div>
                    <div className="workout-form">
                        <h2>Calculate Routine</h2>
                        <div className="workout-form__percentage-increments">
                            <p>Percentage Increments (%):</p>
                            {
                                this.state.listedIncrements.map((increment) => {
                                    var inputName = "increment-" + increment;

                                    return (
                                        <div className="property property--checkbox">
                                            <label htmlFor={inputName}>{increment}</label>
                                            <input
                                                id={inputName}
                                                className="workout-form__percentage-increment"
                                                onChange={this.onIncrementsChange}
                                                name="allowedIncrements[]"
                                                checked={this.state.allowedIncrements.indexOf(increment) >= 0}
                                                type="checkbox"
                                                value={increment}
                                            />
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div className="property">
                            <label htmlFor="rmWeight">Enter 1 RM Weight (lb): </label>
                            <div className="value">
                                <input
                                    id="rmWeight"
                                    onChange={this.onTextChange}
                                    onKeyDown={this.onKeyDown}
                                    value={this.state.rmWeight === 0 ? null : this.state.rmWeight}
                                    placeholder={this.state.rmWeight}
                                />
                            </div>
                        </div>
                        <a
                            href="#"
                            onClick={this.save}
                        >Submit</a>
                    </div>
                </div>
            );
        }
    });

module.exports = WorkoutForm;
