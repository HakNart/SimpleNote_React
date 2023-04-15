import React from 'react'

export const TextNote = ({note}) => {
  return (
    <div>
      <h3 class="mb-2 text-xl font-bold tracking-tight text-gray-900">
        {note.title}
      </h3>
      <p class="font-normal text-sm text-gray-700">
        {note.content}
      </p>
    </div>
  )
}
