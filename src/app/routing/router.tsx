import { createBrowserRouter } from 'react-router';
import { Layout } from '@/app/layout/Layout';
import { paths } from '@/utils/constants';
import * as Pages from '@/pages/index';

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                element: <Pages.Home />,
                path: paths.home,
            },
            {
                element: <Pages.Notfound />,
                path: paths.notFound,
            },
        ],
    },
]);
