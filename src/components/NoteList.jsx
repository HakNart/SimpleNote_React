import React, { useEffect, useState } from 'react'
import { NoteCard } from './elements/NoteCard'
import { useNote } from '../context/NoteContext'

export const NoteList = () => {
  const { notes, setNotes} = useNote();

  useEffect(() => {
    async function fetchNotes() {
      const response = await fetch(`http://localhost:3004/notes`);
      const data = await response.json();
      setNotes(data);
    }
    fetchNotes();
  }, [])
  return (
    <div className='container mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {notes.map(note => (
          <NoteCard key={note.id} note={note} />
        ))}

      </div>
    </div>
  )
}

