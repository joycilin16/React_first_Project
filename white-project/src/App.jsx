import {} from "antd";
import AppHeader from './assets/components/Header'
import AppFooter from './assets/components/Footer'
import PageContent from './assets/components/PageContent'
import './App.css'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
      <AppHeader />
      <PageContent />
      <AppFooter />
      </BrowserRouter>
    </div>
  )
}

export default App
