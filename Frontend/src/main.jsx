import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProductContextProvider from './Context/ProductContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
<GoogleOAuthProvider clientId='10857224968-q4evs0gsr4p2h2qf2luodb541n2sgm9p.apps.googleusercontent.com'>
<ProductContextProvider>
<App />
</ProductContextProvider>
</GoogleOAuthProvider>
)
