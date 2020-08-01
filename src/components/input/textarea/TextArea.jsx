import React from 'react';
import { TextArea as TextAreaSemantic } from 'semantic-ui-react';

/**
 * Wrapper for IMaskInput
 *
 * @param {any} props component props.
 *
 * @returns {JSX} masked input.
 */
export default function TextArea(props)
{
    return (
        <div className='ui form'>
            <TextAreaSemantic { ...props } />
        </div>
    );
}