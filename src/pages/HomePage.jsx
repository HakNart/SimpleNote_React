import React from 'react'
import 'flowbite';
import { NoteList } from '../components/NoteList'
import { CreateNoteForm } from '../components/CreateNoteForm';

export default function HomePage() {
  return (
    <main>
      <CreateNoteForm />
      <NoteList/>
    </main>
  )
}
