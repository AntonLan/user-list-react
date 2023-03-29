import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { stores } from '@/store/configuration/storeInitializer'
import { Provider } from 'mobx-react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider {...stores}>
			<App />
		</Provider>
	</React.StrictMode>
)
