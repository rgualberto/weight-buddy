var React = require('react'),
    Calculation = require('./Calculation'),
    CalculatorForm = require('./CalculatorForm'),
    WeightsStore = require('../stores/WeightsStore'),

    WeightsApp = React.createClass({
        getInitialState () {
            weightStates = WeightsStore.getWeightStates();

            return {
                totalWeight: weightStates.totalWeight,
                bbWeight: weightStates.bbWeight
            }
        },

        componentDidMount () {
            WeightsStore.addChangeListener(this.handleStoreChange);
        },

        componentWillUnmount () {
            WeightsStore.removeChangeListener(this.handleStoreChange);
        },

        handleStoreChange () {
            weightStates = WeightsStore.getWeightStates();

            this.setState({
                totalWeight: weightStates.totalWeight,
                bbWeight: weightStates.bbWeight
            });
        },

        render () {
            return (
                <div className="calculator">
                    <CalculatorForm />
                    <Calculation
                        totalWeight={this.state.totalWeight}
                        bbWeight={this.state.bbWeight}
                    />
                </div>
            );
        }
    });

module.exports = WeightsApp;
