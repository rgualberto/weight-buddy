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

        selectInputs (type) {
            event.preventDefault();

            var currentState = this.state,
                listedIncrements = currentState.listedIncrements,
                allowedIncrements = [];

            switch (type) {
                case 'all':
                    allowedIncrements = listedIncrements;
                    break;

                case 10:
                    for (var i=0; i < listedIncrements.length; i++) {
                        if (listedIncrements[i]%10 === 0) {
                            allowedIncrements.push(listedIncrements[i]);
                        }
                    }
                    break;

                case 5:
                    for (var i=0; i < listedIncrements.length; i++) {
                        if (listedIncrements[i]%10 === 5) {
                            allowedIncrements.push(listedIncrements[i]);
                        }
                    }
                    break;

                default:
                    break;
            }

            currentState['allowedIncrements'] = allowedIncrements;
            this.setState(currentState);
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
                            <div className="workout-form__quick-tabs">
                                <a
                                    href="#"
                                    onClick={this.selectInputs.bind(this, 'all')}
                                >Select All</a>
                                <a
                                    href="#"
                                    onClick={this.selectInputs.bind(this, '')}
                                >Deselect All</a>
                                <a
                                    href="#"
                                    onClick={this.selectInputs.bind(this, 10)}
                                >10's</a>
                                <a
                                    href="#"
                                    onClick={this.selectInputs.bind(this, 5)}
                                >5's</a>
                            </div>
                            {
                                this.state.listedIncrements.map((increment) => {
                                    var inputName = "increment-" + increment;

                                    return (
                                        <div className="property property--checkbox">
                                            <label htmlFor={inputName}>{increment}</label>
                                            <div className="value">
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
                            className="submit-button"
                            href="#"
                            onClick={this.save}
                        >Submit</a>
                    </div>
                </div>
            );
        }
    });

module.exports = WorkoutForm;
