import '@/index.css';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './routing/router';
import { ThemeProvider } from '@/components/theme-provider';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error) => {
            console.error(`Глобальная ошибка: ${error.message}`);
        },
    }),
});

createRoot(document.getElementById('root')!).render(
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </ThemeProvider>,
);
