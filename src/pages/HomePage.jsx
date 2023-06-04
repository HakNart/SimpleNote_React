import React from 'react'
import 'flowbite';
import { NoteList } from '../components/NoteList'
import { CreateNoteForm } from '../components/CreateNoteForm';
import { NotesProvider, useNote } from '../context/NoteContext';
import { getAllNotesFromUsernameApi } from '../api/CRUDApiService';

export default function HomePage() {
  const {notes, setNotes} = useNote();
  function refreshNotes() {
    getAllNotesFromUsernameApi()
    .then(response => {
      setNotes(response.data)
      console.log("Note List rendered")
    })
    .catch(error => console.log(error))
  }

  return (

        <main>
          <CreateNoteForm refreshNotes={refreshNotes}/>
          <NoteList refreshNotes={refreshNotes}/>
        </main>

  )
}
