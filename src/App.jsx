import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Home from './components/Home'
import LoginPage from './components/loginPage'
import Bookshelves from './components/Bookshelve'
import SettingsPage from './components/Setting'
import BookItemDetails from './components/BookItemDetails'

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
        <Routes>
          <Route path="/bookshelves/:id" element={<BookItemDetails />} />
        </Routes>
     </BrowserRouter>
      
    </> 
  )
}

export default App
