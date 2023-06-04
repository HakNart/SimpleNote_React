import React, { useEffect, useRef, useState } from 'react'
import {BsFillTrash3Fill} from 'react-icons/bs'
import { useNote } from '../context/NoteContext';
import { deleteNoteApi, updatedNoteApi } from '../api/CRUDApiService';

export const EditNoteModal = ({ note, isOpenModal, onClose, setSelectedNote }) => {
  if (!isOpenModal) {
    return null;
  }
  const {notes ,setNotes} = useNote();
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const textAreaRef = useRef();

  function resizeTextArea() {
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
  }

  useEffect(resizeTextArea, [content])

  async function handleNoteUpdate(e) {
    e.preventDefault();
    const updateNote = {
      id: note.id,
      title: title,
      content: content,
      type: 'text',
    }
    const requestOptions = {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(updateNote)
    }
    // const response = await fetch(`http://localhost:8080/users/23/notes/${updateNote.id}`, requestOptions);
    // const data = await response.json();
    updatedNoteApi(note.id, updateNote)
    .then(response => {
      setContent("");
      setTitle("");
    })
    .catch(err => console.log(err))

    const updatedNotes = notes.map(note => {
      if (note.id === updateNote.id) {
        return {...note, title: updateNote.title, content: updateNote.content};
      } else {
        return note;
      }
    })

    setNotes(updatedNotes);
    onClose();
    setSelectedNote(null);
  }
  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleContentChange(e) {
    setContent(e.target.value);
  }
  // TDOO: delete note logic
  async function handleNoteDelete(e) {
    e.preventDefault();
    const toDeleteNote = note; 
    console.log(toDeleteNote);
    deleteNoteApi(note.id)
    .then(response => {
      setNotes(notes.filter(note => note.id !== toDeleteNote.id));
    })
    .catch(err => console.log(err))
    onClose();
  }
  return (
    <div class="modal fixed top-0 left-0 right-0 z-50 h-[calc(100%-1rem)] w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0 md:h-full bg-slate-800/50">

      <div class="modal-content flex flex-col create-form mx-auto my-20 max-w-2xl min-h-[14rem] h-auto bg-gray-100 p-2 rounded-xl border-2 border-gray-300 z-30">
      <form className='flex flex-col justify-between grow' onSubmit={handleNoteUpdate}>
        
        {/* Title */}
        <div className="w-full mb-3 flex-none">
          <input id='title' type="text" className="block px-0 w-full text-xl font-bold text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-gray-400" placeholder="Title" value={title} onChange={handleTitleChange}/>
        </div>
        {/* Text area */}
        <div className='flex-auto'>
          <textarea className='bg-transparent resize-none w-full h-full  leading-normal border-0 border-none outline-none m-0 p-0 overflow-y-hidden max-h-96' onChange={handleContentChange} ref={textAreaRef} value={content} />
        </div>
        <div className='flex justify-between'>
            <button type="button" class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg px-3 py-2.5 text-center inline-flex items-center mr-2"
              onClick={handleNoteDelete}
            >
              <BsFillTrash3Fill/>
            </button>
          <button type="button" class="text-white bg-cyan-600 hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2" onClick={handleNoteUpdate}>Update</button>
        </div>
      
        </form>
    </div>
    </div>
  )
}
