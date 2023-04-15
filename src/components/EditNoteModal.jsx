import React, { useEffect, useRef, useState } from 'react'

export const EditNoteModal = ({ note, isOpenModal, onClose, setSelectedNote }) => {
  if (!isOpenModal) {
    return null;
  }
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const textAreaRef = useRef();

  function resizeTextArea() {
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
  }

  useEffect(resizeTextArea, [content])

  function handleNoteUpdate(e) {
    e.preventDefault();
    onClose();
    setSelectedNote(null);
  }
  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleContentChange(e) {
    setContent(e.target.value);
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
          <textarea className='bg-transparent resize-none w-full h-full  leading-normal border-0 border-none outline-none m-0 p-0 overflow-y-hidden max-h-96' onChange={handleContentChange} ref={textAreaRef}>{content}</textarea>
        </div>
        <div className='flex justify-end'>
          <button type="button" class="text-white bg-cyan-600 hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2" onClick={handleNoteUpdate}>Update</button>
        </div>
      
        </form>
    </div>
    </div>
  )
}
