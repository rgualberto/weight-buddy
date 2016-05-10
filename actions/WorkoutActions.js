var AppDispatcher = require('../dispatcher/AppDispatcher'),
    WorkoutConstants = require('../constants/WorkoutConstants'),

    WorkoutActions = {
        evalWorkout (workoutState) {
            AppDispatcher.dispatch({
                actionType: WorkoutConstants.EVAL_WORKOUT,
                workoutState: workoutState
            })
        }
    };

module.exports = WorkoutActions;
