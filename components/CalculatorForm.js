var React = require('react'),
    isEmpty = require('lodash/fp/isEmpty'),
    CalculatorActions = require('../actions/CalculatorActions'),
    WeightsStore = require('../stores/WeightsStore'),

    Calculator = React.createClass({
        getInitialState () {
            weightStates = WeightsStore.getWeightStates();

            return {
                totalWeight: weightStates.totalWeight,
                bbWeight: weightStates.bbWeight
            }
        },

        onTextChange (event) {
            var currentState = this.state;

            currentState[event.target.id] = event.target.value;
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
                    <div className="calculator__form">
                        <h2>Calculate Plate Breakdown</h2>
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
