import React, { useEffect, useState } from 'react'
import { NoteCard } from './elements/NoteCard'
import { useNote } from '../context/NoteContext'
import { EditNoteModal } from './EditNoteModal';

export const NoteList = () => {
  const { notes, setNotes} = useNote();
  const [isOpenModal, setOpenModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

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
          <NoteCard key={note.id} note={note} setOpenModal={setOpenModal} setSelectedNote={setSelectedNote} />
        ))}
      </div>
      {isOpenModal && (
        <EditNoteModal
          isOpenModal={isOpenModal}
          onClose={() => {
            setOpenModal(false);
            
          }}
          note = {selectedNote}
          setSelectedNote={setSelectedNote}
        />
      )}
    </div>
  )
}

