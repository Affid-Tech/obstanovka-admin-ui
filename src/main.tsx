import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {QueryClientProvider} from '@tanstack/react-query';
import App from './app/App';
import {theme} from './app/theme';
import {queryClient} from './lib/queryClient';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <QueryClientProvider client={queryClient}>
                    <App/>
                </QueryClientProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);