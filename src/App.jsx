import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Home from './components/Home'
import LoginPage from './components/loginPage'
import ProtectedRoute from './components/ProtectedRoute'

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
        </Routes>
     </BrowserRouter>
      
    </>
  )
}

export default App
