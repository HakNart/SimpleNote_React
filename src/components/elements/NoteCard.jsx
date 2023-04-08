import React from 'react'
import { TextNote } from './TextNote'
import { CheckList } from './CheckList'

export const NoteCard = () => {
  return (
    <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" type='button' className="flex flex-col justify-center  border-2 border-gray-300 rounded-xl p-5 bg-gray-100 hover:bg-gray-300">
      {/* <TextNote/> */}
      <CheckList/>
      
    </button>

  )
}
