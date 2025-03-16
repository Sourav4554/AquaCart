import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProductContextProvider from './Context/ProductContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
<GoogleOAuthProvider clientId='635073242821-k2ta004utqjjufrssv819mjtk6ls70nn.apps.googleusercontent.com'>
<ProductContextProvider>
<App />
</ProductContextProvider>
</GoogleOAuthProvider>
)
