import React, { useEffect, useRef, useState } from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import { useNote } from '../context/NoteContext';

export const CreateNoteForm = () => {

  const {notes, setNotes} = useNote();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isExpanded, setExpanded] = useState(false);
  const textAreaRef = useRef();


  function resizeTextArea() {
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
  }

  useEffect(resizeTextArea, [content])

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleContentChange(e) {
    setExpanded(true);
    setContent(e.target.value);
  }

  const handleCreateNote = async (e) => {
    e.preventDefault();
    setExpanded(false);
    const newNote = {
      title: title,
      content: content,
      type: 'text',
    }
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newNote)
    }
    const response = await fetch(`http://localhost:8080/users/23/notes`, requestOptions);
    const data = await response.json();
    setContent("");
    setTitle("");
    setNotes([data,...notes]);

  }
  return (
    <div class="flex flex-col create-form mx-auto my-5 max-w-lg min-h-[14rem] h-auto bg-gray-100 p-2 rounded-xl border-2 border-gray-300">
      <form className='flex flex-col justify-between grow'>
        {/* Toggle type */}
        {/* <div>
        <label className='relative inline-flex items-center mb-5 cursor-pointer'>
          <input onChange={handleNoteTypeToggle} type='checkbox' className='sr-only peer'/>
          <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-blue-600"></div>
          <span class="ml-3 text-sm font-medium text-gray-900 ">{type==='text'? "Text": "CheckBox"}</span>
        </label>
        </div> */}
        
        {/* Title */}
        <div className="w-full mb-3 flex-none">
          <input id='title' type="text" className="block px-0 w-full text-xl font-bold text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-gray-400" placeholder="Title" value={title} onChange={handleTitleChange}/>
        </div>
        {/* Text area */}
        <div className='flex-auto'>
          <textarea className='bg-transparent w-full h-full resize-none leading-normal border-0 border-none outline-none m-0 p-0 overflow-y-hidden max-h-96' onChange={handleContentChange} placeholder='Type your note...' ref={textAreaRef} value={content} />
        </div>
        {isExpanded && <div className='flex justify-end'>
          <button class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2" onClick={handleCreateNote}>Save</button>
        </div>
        }
        </form>
    </div>
  )
}
