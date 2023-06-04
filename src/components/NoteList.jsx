import React, { useEffect, useState } from 'react'
import { NoteCard } from './elements/NoteCard'
import { useNote } from '../context/NoteContext'
import { EditNoteModal } from './EditNoteModal';
import { useAuth } from '../context/AuthenticationContext';
import { useNavigate } from 'react-router-dom';
import { getAllNotesFromUsernameApi } from '../api/CRUDApiService';



export const NoteList = ({refreshNotes}) => {
  const { notes, setNotes} = useNote();
  const [isOpenModal, setOpenModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const authContext = useAuth();
  const username = authContext.username;
  const navigate = useNavigate();

  useEffect(() => refreshNotes(), [])

  function refreshNotes() {
    getAllNotesFromUsernameApi()
    .then(response => {
      setNotes(response.data)
      console.log("Note List rendered")
    })
    .catch(error => console.log(error))
  }
  



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

