import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import SessionProvider from './auth/contexts/SessionProvider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<SessionProvider>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</SessionProvider>
	</React.StrictMode>
)
