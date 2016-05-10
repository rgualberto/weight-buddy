var AppDispatcher = require('../dispatcher/AppDispatcher'),
    CalculatorConstants = require('../constants/CalculatorConstants'),
    WorkoutConstants = require('../constants/WorkoutConstants'),
    { EventEmitter } = require('events'),

    events = new EventEmitter(),
    CHANGE_EVENT = 'CHANGE',

    _currentWeightStates = {
        totalWeight: 0,
        bbWeight: 45,
        listedWeights: [45, 35, 25, 10, 5, 2.5],
        allowedWeights: [45, 35, 25, 10, 5, 2.5]
    },

    _currentWorkoutStates = {
        rmWeight: 0,
        listedIncrements: [40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95],
        allowedIncrements: [40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95]
    },

    updateWeightStates = (weightState) => {
        _currentWeightStates.totalWeight = parseFloat(weightState.totalWeight);
        _currentWeightStates.bbWeight = parseFloat(weightState.bbWeight);
        _currentWeightStates.allowedWeights = weightState.allowedWeights;
    },

    updateWorkoutStates = (workoutState) => {
        _currentWorkoutStates.rmWeight = parseFloat(workoutState.rmWeight);
        _currentWorkoutStates.allowedIncrements = workoutState.allowedIncrements;
    },

    WeightsStore = {
        emit () {
            events.emit(CHANGE_EVENT);
        },

        addChangeListener (callback) {
            events.addListener(CHANGE_EVENT, callback);
        },

        removeChangeListener (callback) {
            events.removeListener(CHANGE_EVENT, callback);
        },

        getWeightStates () {
            return _currentWeightStates;
        },

        getWorkoutStates () {
            return _currentWorkoutStates;
        }
    };

AppDispatcher.register((action) => {
    switch(action.actionType) {
        case CalculatorConstants.EVAL_WEIGHTS:
            updateWeightStates(action.weightState);
            WeightsStore.emit();
            break;

        case WorkoutConstants.EVAL_WORKOUT:
            updateWorkoutStates(action.workoutState);
            WeightsStore.emit();
            break;

        default:
            // do nothing
    }
});

module.exports = WeightsStore;
