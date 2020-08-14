import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AzureActiveDirectoryProvider, AzureActiveDirectorySecurityMode } from 'services/security';
import store from 'store/store';
import AppRouter from 'routes';
import 'styles/app.scss';

/**
 * App container.
 *
 * Here occur the initialization
 * and localization of some libs.
 *
 * @returns {React.ReactElement} App container.
 */
export default function App()
{
    return (
        <BrowserRouter>
            <Provider store={ store }>
                <AzureActiveDirectoryProvider
                    mode={ AzureActiveDirectorySecurityMode.WHITELIST }
                    errorRoute='/401'
                >
                    <AppRouter />
                </AzureActiveDirectoryProvider>
            </Provider>

            <ToastContainer />
        </BrowserRouter>
    );
}
