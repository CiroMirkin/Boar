import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { store } from './store.ts'
import { Provider } from 'react-redux'
import SessionProvider from './SessionProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<SessionProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</SessionProvider>
	</React.StrictMode>
)
