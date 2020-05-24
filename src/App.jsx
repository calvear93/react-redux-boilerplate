import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import store from './store/store';
import Router from './Router';
import 'moment/locale/es-us';
import { loadMessages, locale } from 'devextreme/localization';
import esMessages from 'devextreme/localization/messages/es';
import './styles/App.scss';
import { AzureActiveDirectoryProvider } from './services/auth';

// Whether AAD authentication is enabled.
const authEnabled = process.env.REACT_APP_AAD_ENABLED === 'true';

/**
 * App container.
 *
 * Here occur the initialization
 * and localization of some libs.
 *
 * @returns {JSX} App container.
 */
export default function App()
{
    // initializes App config.
    useEffect(() =>
    {
        // DevExpress localization.
        loadMessages(esMessages);
        locale(navigator.language);
    }, []);

    return (
        <BrowserRouter>
            <Provider store={ store }>
                <AzureActiveDirectoryProvider enabled={ authEnabled } errorRoute='/notauthorized'>
                    <Router />
                    <ToastContainer />
                </AzureActiveDirectoryProvider>
            </Provider>
        </BrowserRouter>
    );
}
