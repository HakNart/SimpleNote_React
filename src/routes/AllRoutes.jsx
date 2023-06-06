import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import AuthProvider, { useAuth } from '../context/AuthenticationContext'
import LoginComponent from '../components/LoginComponent'
import { NotesProvider } from '../context/NoteContext'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

function AuthenticatedRoute({ children }) {
  const authContext = useAuth()
  if (authContext.isAuthenticated) {
    console.log("Authenticated true")
    return children
  }
  return <Navigate to='/' />
}

export default function AllRoutes() {
  return (
    <div>
      <AuthProvider>
        <NotesProvider>
          <Header/>
          <Routes>
            <Route path='/' element={<LoginComponent />} />
            <Route path='/login' element={<LoginComponent />} />

            <Route path='/notes' element={
              <AuthenticatedRoute>
                <HomePage />
              </AuthenticatedRoute>
            } />
          </Routes>
          <Footer />
        </NotesProvider>

      </AuthProvider>

    </div>
  )
}
