import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'


export default function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        {/* <Route path='/:username/notes' element={<NoteList/>}/> */}
      </Routes>
    </div>
  )
}
