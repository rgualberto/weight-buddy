var React = require('react'),
    forEach = require('lodash/forEach'),

    Calculation = React.createClass({
        shouldComponentUpdate (nextProps, nextState) {
            var totalChanged = nextProps.totalWeight === this.props.totalWeight,
                bbChanged = nextProps.bbWeight === this.props.bbWeight;

            return totalChanged || bbChanged;
        },

        propTypes: {
            totalWeight: React.PropTypes.number.isRequired,
            bbWeight: React.PropTypes.number.isRequired
        },

        getAvailableWeights () {
            return [45, 35, 25, 10, 5, 2.5];
        },

        calculateWeights (totalWeight) {
            var availableWeights = this.getAvailableWeights(),
                barWeight = this.props.bbWeight,
                weightWithoutBar = totalWeight - barWeight,
                finalWeights = [],
                leftOverWeight = 0,
                twoWeights,
                status = 'clean';

            if (weightWithoutBar <= 0) {
                status = 'invalidWeight';
            }
            else {
                forEach(availableWeights, function (weight) {
                    twoWeights = weight * 2;
                    while (twoWeights <= weightWithoutBar) {
                        finalWeights.push(weight);
                        weightWithoutBar -= twoWeights;
                    }
                });

                if (weightWithoutBar !== 0) {
                    leftOverWeight = weightWithoutBar;
                }
            }

            return {
                status: status,
                finalWeights: finalWeights,
                leftOverWeight: leftOverWeight
            };
        },

        buildWeightList (weightsArray) {
            var weightList = [],
                escapeWeight;

            forEach(weightsArray, function (weight) {
                escapeWeight = weight.toString().replace('.', '-');
                weightList.push(<li><img className={'calculation-plate-' + escapeWeight} src={"assets/images/plate_" + escapeWeight + ".png"} /></li>)
            });
            
            return weightList;
        },

        getStats (leftOverWeight) {
            var barWeight = this.props.bbWeight,
                calculatedWeight = this.props.totalWeight - leftOverWeight;

            return (
                <p>
                    Available Weights:
                    <span className="calculation-messaging__result">{this.getAvailableWeights().join(', ')}</span>
                    <br/>

                    Total Weight:
                    <span className="calculation-messaging__result">{this.props.totalWeight}</span>
                    <br/>

                    Barbell Weight:
                    <span className="calculation-messaging__result">{barWeight}</span>
                    <br/>

                    Weight Not Added:
                    <span className="calculation-messaging__result">{leftOverWeight}</span>
                    <br/>

                    Calculated Weight:
                    <span className="calculation-messaging__result">{calculatedWeight}</span>
                </p>
            )
        },

        render () {
            // escape if 0 weight given
            if (this.props.totalWeight === 0) { return false; }

            var calculation = '',
                messaging = '',
                weightDisplay,
                calculatedWeights = this.calculateWeights(this.props.totalWeight);

            if (calculatedWeights.status === 'invalidWeight') {
                messaging = 'Weight entered is lower than or equal to the bar weight.';
            }
            else {
                calculation = this.buildWeightList(calculatedWeights.finalWeights);
                messaging = (
                    <p className="calculation-messaging">
                        <p>Place the following weights on each side of the barbell:</p>
                        {this.getStats(calculatedWeights.leftOverWeight)}
                    </p>
                );
            }

            return (
                <div>
                    {messaging}
                    <ul className="calculation-list">{calculation}</ul>
                </div>
            );
        }
    });

module.exports = Calculation;
