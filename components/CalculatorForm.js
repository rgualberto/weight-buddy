var React = require('react'),
    isEmpty = require('lodash/fp/isEmpty'),
    CalculatorActions = require('../actions/CalculatorActions'),
    WeightsStore = require('../stores/WeightsStore'),
    forEach = require('lodash/forEach'),

    Calculator = React.createClass({
        getInitialState () {
            weightStates = WeightsStore.getWeightStates();

            return {
                totalWeight: weightStates.totalWeight,
                bbWeight: weightStates.bbWeight,
                listedWeights: weightStates.listedWeights,
                allowedWeights: weightStates.allowedWeights
            }
        },

        onTextChange (event) {
            var currentState = this.state;

            currentState[event.target.id] = event.target.value;
            this.setState(currentState);
        },

        onAllowedWeightsChange (event) {
            var currentState = this.state,
                selectedWeights = [],
                weightInputs = document.getElementsByClassName('calculator-form__allowed-wieghts-input');

            forEach(weightInputs, (weightInput) =>{
                if (weightInput.checked){
                    selectedWeights.push(parseFloat(weightInput.value));
                }
            });

            currentState['allowedWeights'] = selectedWeights;
            this.setState(currentState);
        },

        onKeyDown (event) {
            // 13 === Enter Key
            if (event.keyCode === 13) {
                this.save(arguments);
            }
        },

        save (event) {
            if (isEmpty(this.state.totalWeight)) {
                return;
            }
            if (event.type === 'click') {
                event.preventDefault();
            }

            CalculatorActions.evalWeights(this.state);
        },

        render () {
            return (
                <div>
                    <div className="calculator-form">
                        <h2>Calculate Plate Breakdown</h2>
                        <div className="calculator-form__allowed-wieghts">
                            <p>Available Plates (lbs):</p>
                            {
                                this.state.listedWeights.map((weight) => {
                                    var inputName = "allowedWeights-" + weight;

                                    return (
                                        <div className="property property--checkbox">
                                            <label htmlFor={inputName}>{weight}</label>
                                            <input
                                                id={inputName}
                                                className="calculator-form__allowed-wieghts-input"
                                                onChange={this.onAllowedWeightsChange}
                                                name="allowedWeights[]"
                                                checked={this.state.allowedWeights.indexOf(weight) >= 0}
                                                type="checkbox"
                                                value={weight}
                                            />
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div className="property">
                            <label htmlFor="bbWeight">Enter Barbell Weight (lb): </label>
                            <div className="value">
                                <input
                                    id="bbWeight"
                                    onChange={this.onTextChange}
                                    onKeyDown={this.onKeyDown}
                                    value={this.state.bbWeight}
                                />
                            </div>
                        </div>
                        <div className="property">
                            <label htmlFor="totalWeight">Enter Total Weight (lb): </label>
                            <div className="value">
                                <input
                                    id="totalWeight"
                                    onChange={this.onTextChange}
                                    onKeyDown={this.onKeyDown}
                                    value={this.state.totalWeight === 0 ? null : this.state.totalWeight}
                                    placeholder={this.state.totalWeight}
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

module.exports = Calculator;
