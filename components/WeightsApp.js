var React = require('react'),
    Calculation = require('./Calculation'),
    CalculatorForm = require('./CalculatorForm'),
    WeightsStore = require('../stores/WeightsStore'),

    WeightsApp = React.createClass({
        getInitialState () {
            return {
                totalWeight: WeightsStore.getTotalWeight()
            }
        },

        componentDidMount () {
            WeightsStore.addChangeListener(this.handleStoreChange);
        },

        componentWillUnmount () {
            WeightsStore.removeChangeListener(this.handleStoreChange);
        },

        handleStoreChange () {
            this.setState({
                totalWeight: WeightsStore.getTotalWeight()
            });
        },

        render () {
            return (
                <div>
                    <CalculatorForm />
                    <Calculation totalWeight={this.state.totalWeight} />
                </div>
            );
        }
    });

module.exports = WeightsApp;
