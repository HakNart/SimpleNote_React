import React from 'react'

export const TextNote = ({note}) => {
  return (
    <div>
      <h3 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        {note.title}
      </h3>
      <p class="font-normal text-gray-700 dark:text-gray-400">
        {note.content}
      </p>
    </div>
  )
}
