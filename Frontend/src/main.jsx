import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProductContextProvider from './Context/ProductContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
<GoogleOAuthProvider clientId='260412012642-isojtthdhdcqsi594jnj5i1fm1g18fqk.apps.googleusercontent.com'>
<ProductContextProvider>
<App />
</ProductContextProvider>
</GoogleOAuthProvider>
)
