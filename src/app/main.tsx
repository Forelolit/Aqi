import '@/index.css';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './routing/router';
import { ThemeProvider } from '@/components/theme-provider';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components';
import { toast } from 'sonner';

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error) => {
            toast.error(`Ошибка: ${error.message}`, { style: { backgroundColor: '#ff3333' } });
        },
    }),
});

createRoot(document.getElementById('root')!).render(
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <Toaster duration={2000} position="top-right" />
        </QueryClientProvider>
    </ThemeProvider>,
);
