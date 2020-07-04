import { SampleDefaults } from '../defaults';
import { SampleAction } from '../actions';

/**
 * Redux Actions Reducer.
 *
 * @param {any} store current store partition state.
 * @param {any} action action dispatched.
 *
 * @returns {any} new store partition.
 */
export default function SampleReducer(store = SampleDefaults, action)
{
    // action destructuring. (key, type or payload).
    const { type, payload } = action;

    switch (type)
    {
        // executes the action.
        case SampleAction.Type.EXEC:
            delete store.error;

            return {
                ...store,
                state: SampleAction.State.EXECUTING
            };

        // action is successful.
        case SampleAction.Type.COMMIT:
            return {
                ...store,
                state: SampleAction.State.READY
            };

        // action was finished with errors.
        case SampleAction.Type.ROLLBACK:
            return {
                ...store,
                state: SampleAction.State.CORRUPT,
                error: payload
            };

        // default doesn't changes the store,
        // so, components don't re-renders.
        default:
            return store;
    }
}
