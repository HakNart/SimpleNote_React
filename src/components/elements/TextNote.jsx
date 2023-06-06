import React from 'react'

export const TextNote = ({note}) => {
  return (
    <div className='container'>
      <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 break-words">
        {note.title}
      </h3>
      <p className="font-normal text-sm text-gray-700 break-words">
        {note.content}
      </p>
    </div>
  )
}
