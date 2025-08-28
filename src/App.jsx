import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import LoginPage from './components/loginPage'
import Bookshelves from './components/Bookshelve'
import SettingsPage from './components/Setting'
import BookItemDetails from './components/BookItemDetails'
import Wishlist from './components/wishlist'
import NotFound from './components/NotFound'
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
          <Route path="/bookshelves/:id" element={<BookItemDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
