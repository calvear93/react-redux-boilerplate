import { CreateAction, MakeUnique } from 'store/shared/action.lib';

/**
 * store partition key.
 *
 * @const
 * @type {string}
 */
const KEY = 'SAMPLE';

/**
 * Redux Action Vault.
 */
const SampleAction =
{
    /**
     * Action Store Key.
     *
     * @memberof SampleAction
     */
    Key: KEY,

    /**
     * Action Types.
     *
     * @memberof SampleAction
     */
    Type: {
        EXEC: 'EXEC',
        COMMIT: 'COMMIT',
        ROLLBACK: 'ROLLBACK'
    },

    /**
     * Reducer States.
     *
     * @memberof SampleAction
     */
    State: {
        PREPARING: 'PREPARING',
        EXECUTING: 'EXECUTING',
        READY: 'READY',
        FAILED: 'FAILED'
    },

    /**
     * Returns the action.
     *
     * @param {string} type action type.
     * @param {object} [payload] data involved in the action.
     *
     * @memberof SampleAction
     *
     * @returns {object} action.
     */
    Action: (type, payload) => CreateAction(SampleAction.Key, type, payload)
};

// makes types unique.
MakeUnique(SampleAction.Type);

export default Object.freeze(SampleAction);
