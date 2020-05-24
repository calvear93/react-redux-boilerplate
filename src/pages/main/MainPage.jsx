import React from 'react';
import '../../styles/pages/main-page.scss';
import Demo from '../../components/Demo';

/**
 * Main page.
 *
 * @returns {JSX} Main page.
 */
export default function MainPage()
{
    return (
        <div className='page-container main-page-container'>
            <div className='main-page-header'>
                HEADER
            </div>

            <div className='main-page-body'>
                BODY
                <Demo />
            </div>
        </div>
    );
}
