import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WishlistProvider } from './reducers/wishListReducer'
import './index.css'
import App from './App.jsx'
import { DarkContextProvider } from './reducers/darkModeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WishlistProvider>
      <DarkContextProvider>
            <App />
      </DarkContextProvider>
    </WishlistProvider>
  </StrictMode>,
)
