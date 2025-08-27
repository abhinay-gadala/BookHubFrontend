import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Home from './components/Home'
import LoginPage from './components/loginPage'
import ProtectedRoute from './components/ProtectedRoute'
import Bookshelves from './components/Bookshelve'
import SettingsPage from './components/Setting'

function App() {
   
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Home />
          } />
          <Route path="/login" element={
            <LoginPage />
          } />
          <Route path="/bookshelves" element={
              <Bookshelves />
            } />
          <Route path="/settings" element={
            <SettingsPage />
          } />
        </Routes>
     </BrowserRouter>
      
    </>
  )
}

export default App
