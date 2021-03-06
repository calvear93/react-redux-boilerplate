import IMask from 'imask';
import { cloneElement } from 'react';
import { IMaskMixin } from 'react-imask';
import { Ref } from 'semantic-ui-react';
import { CustomOnChangeEvent } from '../shared';

/**
 * Attaches a mask (using imask) to an input.
 *
 * @example
 *  <Mask mask={ PhoneMask } onAccept={ onInputChange } value={ values['phone'] }>
 *      <Form.Input
 *          id='phone'
 *          placeholder='Enter your phone number'
 *      />
 *  </Mask>
 *
 * @param {object} props component props.
 * @param {any} props.mask mask.
 * @param {React.ReactElement} props.children input for wrap.
 * @param {Function} [props.onAccept] when input is formatted (like onChange).
 * @param {object} [props.props] component props.
 *
 * @returns {React.ReactElement} masked input.
 */
export default function Mask({ mask, children, onAccept, ...props })
{
    /**
     * Maps onAccept result for onChange behavior.
     *
     * @param {string} value current value.
     * @param {any} masker mask controller.
     */
    function handleAccept(value, masker)
    {
        if (value !== props.value)
        {
            // creates custom event.
            let event = CustomOnChangeEvent({
                id: masker.el.input.id,
                value,
                masker
            });
            onAccept && onAccept(event, { id: masker.el.input.id, value });
        }
    }

    return (
        <MaskedInput mask={ IMask.createMask(mask) } onAccept={ handleAccept } { ...props }>
            {children}
        </MaskedInput>
    );
}

/**
 * Searches for input inside the DOM node.
 *
 * @param {any} node parent node.
 * @returns {any} input node.
 */
function findInput(node)
{
    return node?.querySelectorAll('input')[0];
}

/**
 * Masks element.
 *
 * @param {any} node parent node.
 * @returns {any} input node.
 */
const MaskedInput = IMaskMixin(({ inputRef, children, ...props }) =>
{
    return (
        <Ref innerRef={ (node) => inputRef(findInput(node)) }>
            {cloneElement(children, { ...props })}
        </Ref>
    );
});
