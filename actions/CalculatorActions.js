var AppDispatcher = require('../dispatcher/AppDispatcher'),
    CalculatorConstants = require('../constants/CalculatorConstants'),

    CalculatorActions = {
        evalWeights (weightState) {
            AppDispatcher.dispatch({
                actionType: CalculatorConstants.EVAL_WEIGHTS,
                weightState: weightState
            })
        }
    };

module.exports = CalculatorActions;
