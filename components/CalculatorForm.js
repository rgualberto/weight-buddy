var React = require('react'),
    isEmpty = require('lodash/fp/isEmpty'),
    CalculatorActions = require('../actions/CalculatorActions'),
    WeightsStore = require('../stores/WeightsStore'),

    Calculator = React.createClass({
        getInitialState () {
            return {
                totalWeight: WeightsStore.getTotalWeight()
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

            CalculatorActions.evalWeights(parseFloat(this.state.totalWeight));
        },

        render () {
            return (
                <div>
                    <div className="calculator__form">
                        <h2>Calculate Plate Breakdown</h2>
                        <p>Enter Total Weight (lb)</p>
                        <input
                            id="totalWeight"
                            onChange={this.onTextChange}
                            onKeyDown={this.onKeyDown}
                            value={this.state.totalWeight === 0 ? null : this.state.totalWeight}
                            placeholder={this.state.totalWeight}
                        />
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
