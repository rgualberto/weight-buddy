var React = require('react'),
    forEach = require('lodash/forEach'),

    Calculation = React.createClass({
        shouldComponentUpdate (nextProps, nextState) {
            return nextProps.totalWeight !== this.props.totalWeight;
        },

        propTypes: {
            totalWeight: React.PropTypes.number.isRequired
        },

        statusMessage: {
            'invalidWeight': 'Weight entered is lower than or equal to the bar weight.',
            'leftOverWeight': 'There was unaccounted for weight due to available weights'
        },

        getAvailableWeights () {
            return [45, 35, 25, 10, 5, 2.5];
        },

        getBarWeight () {
            return 45;
        },

        calculateWeights (totalWeight) {
            var availableWeights = this.getAvailableWeights(),
                barWeight = this.getBarWeight(),
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
                    status = 'leftOverWeight';
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

        render () {
            // escape if 0 weight given
            if (this.props.totalWeight === 0) { return false; }

            var calculation = '',
                messaging = '',
                weightDisplay,
                calculatedWeights = this.calculateWeights(this.props.totalWeight);

            if (calculatedWeights.status === 'invalidWeight') {
                messaging = this.statusMessage['invalidWeight'];
            }
            else {
                calculation = this.buildWeightList(calculatedWeights.finalWeights);
                messaging = <p>Place the following weights on each side of the barbell:</p>;

                if (calculatedWeights.status === 'leftOverWeight') {
                    messaging = <p>{messaging}{this.statusMessage['leftOverWeight'] + ':' + calculatedWeights.leftOverWeight}</p>;
                }
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
