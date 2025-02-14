
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Context from './Context/Context.jsx'
import { BrowserRouter } from 'react-router-dom'
import ThemeProviderWrapper from './Context/ThemeContext.jsx'
createRoot(document.getElementById('root')).render(
<BrowserRouter>
<ThemeProviderWrapper>
<Context>
<App />
</Context>
</ThemeProviderWrapper>
</BrowserRouter>
 
)
