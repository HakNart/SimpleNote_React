import React, { useContext, useEffect, useState } from 'react';
import { updateNoteApi } from '../api/NoteApiService';
import { NoteContext } from '../pages/Notes';

export function NoteEditModal({note, isOpen, onClose, onUpdate, onDelete}) {
  
  const [title, setTitle] = useState(note?note.title : '');
  const [content, setContent] = useState(note?note.content : '');
  const [itemList, setItemList] = useState(note&&note.type=="checklist"?note.listItems: null);
  // Handle list item

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }
  const handleContentChange =(e) => {
    setContent(e.target.value);
  }
  const handleNoteUpdate = (e) => {
    e.preventDefault();
    note.title = title;
    if(note.type == "text"){
      note.content = content;
    }
    else if (note.type == "checklist"){
      note.listItems = itemList;
    }
    onUpdate(note.id, note);
    onClose();
  };
  const handleCheckListItemChange = (e, id) => {
    let item = itemList.find(item => item.id == id);
    item.checked = e.target.checked;
    setItemList([...itemList]);
  }
  const handleNoteDelete = (e) => {
    e.preventDefault();
    onDelete(note.id);
    onClose();
  }
  let editBody;
  
  if (note && note.type == "text") {
    editBody = <textarea
    rows={4}
    name="content"
    value={content}
    onChange={handleContentChange}
    className="min-h-20 m-0 block max-h-[50vh] w-full resize-none border-0 border-none border-current bg-transparent p-0 leading-normal outline-none"
    >
    </textarea>
  } else if (note && note.type == "checklist") {
    editBody = <ul>
    {note.listItems.map((item) => (
      <div key={item.id} className="form-control">
        <label className="label cursor-pointer justify-start">
          <input
            type="checkbox"
            className="checkbox-success checkbox"
            // defaultChecked={item.checked}
            checked={item.checked}
            onChange={(e)=>handleCheckListItemChange(e, item.id)}
          />
          <span className="label-text pl-1">{item.text}</span>
        </label>
      </div>
    ))}
  </ul>
  }
  return (
    <div 
      className="hidden z-1 fixed left-0 top-0 h-screen w-screen overflow-y-hidden bg-[rgba(0,0,0,0.2)] pt-24"
      style={{display: isOpen? 'block': 'none'}}
      >
      <div className="m-auto max-w-md bg-base-200 p-5 text-base-content rounded-lg">
        <form onSubmit={handleNoteUpdate}>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="m-b-0 block w-full border-none bg-transparent p-0 font-bold outline-none" />
          {editBody}
          
          
          <div className='flex justify-between'>
          <button className="btn btn-sm btn-success">Save</button>
          <button className='btn btn-error btn-sm' onClick={handleNoteDelete}>Delete</button>
          </div>
          
        </form>
        
      </div>
    </div>
  );
}

function TextNoteEditForm({handleNoteUpdate, handleTitleChange, handleContentChange, handleNoteDelete}) {
  return (
    <form onSubmit={handleNoteUpdate}>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="m-b-0 block w-full border-none bg-transparent p-0 font-bold outline-none" />
            
          <textarea
            rows={4}
            name="content"
            value={content}
            onChange={handleContentChange}
            className="min-h-20 m-0 block max-h-[50vh] w-full resize-none border-0 border-none border-current bg-transparent p-0 leading-normal outline-none"
          ></textarea>
          <div className='flex justify-between'>
          <button className="btn btn-sm btn-success">Save</button>
          <button className='btn btn-error btn-sm' onClick={handleNoteDelete}>Delete</button>
          </div>
          
        </form>
  )
}
