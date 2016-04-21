var AppDispatcher = require('../dispatcher/AppDispatcher'),
    CalculatorConstants = require('../constants/CalculatorConstants'),

    CalculatorActions = {
        evalWeights (totalWeight) {
            AppDispatcher.dispatch({
                actionType: CalculatorConstants.EVAL_WEIGHTS,
                totalWeight: totalWeight
            })
        }
    };

module.exports = CalculatorActions;
