import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { appStore } from './app/store'
import { Toaster } from './components/ui/sonner'
import { useLoadUserQuery } from './features/api/authApi'
import LoadingScreen from './components/LoadingScreen'

const Custom = ({children}) => {
  const {isLoading} = useLoadUserQuery();
  return (
    <>
    {
      isLoading ? <LoadingScreen></LoadingScreen> : <>{children}</>
    }
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {appStore}>
      <Custom>
        <App />
        <Toaster/>
      </Custom>
    </Provider>
  </StrictMode>,
)
