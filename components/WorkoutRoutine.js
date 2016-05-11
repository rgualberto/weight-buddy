var React = require('react'),
    forEach = require('lodash/forEach'),
    isEqual = require('lodash/isEqual'),

    WorkoutRoutine = React.createClass({
        shouldComponentUpdate (nextProps, nextState) {
            var rmChanged = nextProps.rmWeight !== this.props.rmWeight,
                allowedChanged = !isEqual(nextProps.allowedIncrements, this.props.allowedIncrements);

            return rmChanged || allowedChanged;
        },

        propTypes: {
            rmWeight: React.PropTypes.number.isRequired,
            allowedIncrements: React.PropTypes.array
        },

        calculateWorkout () {
            var workout = {},
                rmWeight = this.props.rmWeight;

            forEach(this.props.allowedIncrements, function (increment) {
                workout[increment] = (rmWeight * increment)/100;
            });
            

            return workout;
        },

        buildRoutine (workout) {
            var workoutTableRow = [],
                escapeWeight;

            forEach(workout, function (weight, increment) {
                workoutTableRow.push(<tr><th>{increment.toString() + '%'}</th><td>{weight.toString() + ' lbs'}</td></tr>)
            });
            
            return workoutTableRow;
        },

        render () {
            // escape if 0 weight given
            if (this.props.rmWeight === 0 || this.props.allowedIncrements.length === 0) { return false; }

            var workoutRows = '',
                calculatedWorkout = this.calculateWorkout();

            workoutRows = this.buildRoutine(calculatedWorkout);

            return (
                <div>
                    <table className="workout-routine">
                        <tbody>
                            <tr>
                                <th>Increments</th>
                                <td>Weight</td>
                            </tr>
                            {workoutRows}
                        </tbody>
                    </table>
                </div>
            );
        }
    });

module.exports = WorkoutRoutine;
