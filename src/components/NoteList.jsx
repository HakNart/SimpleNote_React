import React, { useState } from 'react'
import { NoteCard } from './elements/NoteCard'

export const NoteList = () => {

  return (
    <div className='container mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <NoteCard/>
        <NoteCard/>
        <NoteCard/>
        <NoteCard/>
      </div>
    </div>
  )
}

