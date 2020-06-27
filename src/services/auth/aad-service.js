/**
 * MSAL Microsoft Authentication service.
 *
 * @summary MSAL service.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-23 19:53:33
 * Last modified  : 2020-06-27 12:27:40
 */

import { DEFAULT_SCOPES } from './aad-cfg';
import AuthenticationContext from './aad-context';
import AADTypes from './aad-types';

export default {

    // Authentication context.
    Context: AuthenticationContext,

    /**
     * Acquire new token for use.
     * JWT Decoding page: @see https://jwt.io/
     *
     * @param {array} scopes array of scopes allowed.
     * @returns {Promise<any>} token container.
     */
    acquireTokenSilent(scopes)
    {
        return AuthenticationContext.acquireTokenSilent({ scopes: scopes ?? DEFAULT_SCOPES });
    },

    /**
     * Redirect to Microsoft AD login if user isn't authenticated.
     * On finishing, redirect to redirectUri.
     *
     * @param {array} type login type (redirect or popup).
     * @param {array} scopes permission scopes.
     * @param {bool} forceTokenRefresh forces to renew token on authentication.
     *
     * @returns {bool} account data if is authenticated, error on failure.
     */
    login({
        type = AADTypes.LOGIN_TYPE.REDIRECT,
        scopes = DEFAULT_SCOPES,
        forceTokenRefresh = false
    } = {})
    {
        return new Promise((resolve, reject) =>
        {
            if (AuthenticationContext.getAccount())
                return resolve(AuthenticationContext.getAccount());

            AuthenticationContext.acquireTokenSilent({ scopes: scopes ?? DEFAULT_SCOPES })
                .then(() => resolve(AuthenticationContext.getAccount()))
                .catch(() =>
                {
                    // authentication process callback.
                    AuthenticationContext.handleRedirectCallback((error, response) =>
                    {
                        if (response)
                            resolve(AuthenticationContext.getAccount());
                        else
                            reject(error);
                    });

                    // redirect method login.
                    AuthenticationContext[type]({
                        scopes,
                        forceRefresh: forceTokenRefresh
                    });
                });
        });
    },

    /**
     * Whether account is authenticated.
     *
     * @returns {boolean} true if authenticated, false in otherwise.
     */
    isAuthenticated()
    {
        return !!AuthenticationContext.getAccount();
    },

    /**
     * Logouts and redirects to postLogoutRedirectUri.
     */
    logout()
    {
        AuthenticationContext.logout();
    },

    /**
     * Clear all access tokens in the cache.
     */
    clearCache()
    {
        AuthenticationContext.clearCache();
    },

    /**
     * Returns current account data.
     *
     * @returns {any} account data.
     */
    getAccount()
    {
        return AuthenticationContext.getAccount();
    },

    /**
     * Returns current account claims.
     *
     * @returns {any} account claims.
     */
    getClaims()
    {
        return AuthenticationContext.getAccount()?.idTokenClaims;
    },

    /**
     * Returns current account roles.
     *
     * @returns {any} account roles.
     */
    getRoles()
    {
        const claims = AuthenticationContext.getAccount()?.idTokenClaims;

        if (Object.prototype.hasOwnProperty.call(claims, 'roles'))
            return claims.roles;

        return null;
    }
};
