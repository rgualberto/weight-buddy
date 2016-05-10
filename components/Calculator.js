var React = require('react'),
    Calculation = require('./Calculation'),
    CalculatorForm = require('./CalculatorForm'),
    WeightsStore = require('../stores/WeightsStore'),

    Calculator = React.createClass({
        getInitialState () {
            return WeightsStore.getWeightStates();
        },

        componentDidMount () {
            WeightsStore.addChangeListener(this.handleStoreChange);
        },

        componentWillUnmount () {
            WeightsStore.removeChangeListener(this.handleStoreChange);
        },

        handleStoreChange () {
            this.setState(WeightsStore.getWeightStates());
        },

        render () {
            return (
                <div className="calculator">
                    <CalculatorForm />
                    <Calculation
                        totalWeight={this.state.totalWeight}
                        bbWeight={this.state.bbWeight}
                        allowedWeights={this.state.allowedWeights}
                    />
                </div>
            );
        }
    });

module.exports = Calculator;
