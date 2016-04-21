var AppDispatcher = require('../dispatcher/AppDispatcher'),
    CalculatorConstants = require('../constants/CalculatorConstants'),
    { EventEmitter } = require('events'),

    events = new EventEmitter(),
    CHANGE_EVENT = 'CHANGE',

    _currentWeightStates = {
        totalWeight: 0,
        bbWeight: 45
    },

    updateWeightStates = (weightState) => {
        _currentWeightStates.totalWeight = parseFloat(weightState.totalWeight);
        _currentWeightStates.bbWeight = parseFloat(weightState.bbWeight);
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
        }
    };

AppDispatcher.register((action) => {
    switch(action.actionType) {
        case CalculatorConstants.EVAL_WEIGHTS:
            updateWeightStates(action.weightState);
            WeightsStore.emit();
            break;

        default:
            // do nothing
    }
});

module.exports = WeightsStore;
