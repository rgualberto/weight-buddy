var AppDispatcher = require('../dispatcher/AppDispatcher'),
    CalculatorConstants = require('../constants/CalculatorConstants'),
    { EventEmitter } = require('events'),

    events = new EventEmitter(),
    CHANGE_EVENT = 'CHANGE',

    _currentTotalWeight = 0,

    updateTotalWeight = (totalWeight) => {
        _currentTotalWeight = totalWeight
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

        getTotalWeight () {
            return _currentTotalWeight;
        }
    };

AppDispatcher.register((action) => {
    switch(action.actionType) {
        case CalculatorConstants.EVAL_WEIGHTS:
            updateTotalWeight(action.totalWeight);
            WeightsStore.emit();
            break;

        default:
            // do nothing
    }
});

module.exports = WeightsStore;
