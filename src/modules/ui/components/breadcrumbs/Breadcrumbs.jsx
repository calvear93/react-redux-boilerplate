import DynamicBreadcrumbs from 'react-router-dynamic-breadcrumbs';

/**
 * Dynamic breadcrumbs for
 * React Router v4+.
 *
 * @see https://www.npmjs.com/package/react-router-dynamic-breadcrumbs
 *
 * @example
 *  Routes should defined as below:
 *  {
 *      '/': 'Home',
 *      '/blog': 'Blog',
 *      '/user/:id': 'User',
 *      ...
 *  }
 *
 * @param {Array<any>} routes breadcrumbs routes array.
 *
 * @returns {React.ReactElement} breadcrumbs.
 */
export default function Breadcrumbs({ routes = [] })
{
    return (
        <DynamicBreadcrumbs
            mappedRoutes={ routes }
            WrapperComponent={ ({ children }) => (
                <div className='ui breadcrumb'>{children}</div>
            ) }
            ActiveLinkComponent={ ({ children }) => (
                <div className='active section'>{children}</div>
            ) }
            LinkComponent={ ({ children }) =>
            {
                // route isn't defined.
                if (!routes[children.props.to])
                    return null;

                return (
                    <>
                        <div className='section'>{children}</div>
                        <i aria-hidden='true' className='right angle icon divider' />
                    </>
                );
            } }
        />
    );
}
