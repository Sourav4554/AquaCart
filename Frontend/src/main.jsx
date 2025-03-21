import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProductContextProvider from './Context/ProductContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
<GoogleOAuthProvider clientId='799707691832-uipui27nnu0a349uiuh6skffrrgotib0.apps.googleusercontent.com'>
<ProductContextProvider>
<App />
</ProductContextProvider>
</GoogleOAuthProvider>
)
