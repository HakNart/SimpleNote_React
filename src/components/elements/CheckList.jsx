import React from 'react'

export const CheckList = ({note}) => {

  return (
    <div>
      <h3 className="mb-2 text-xl font-bold text-gray-900 ">{note.title}</h3>
      <ul className="text-sm font-medium text-gray-900  rounded-lg">
        {note.items.map(item =>
          <li className="w-full border-b border-gray-200 rounded-t-lg">
            <div className="flex items-baseline pl-3">
              <input id="vue-checkbox" type="checkbox" className="w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
              <label for="vue-checkbox" className="max-w-full items-baseline py-3 ml-2 text-sm font-medium text-gray-900">{item.text}</label>
            </div>
          </li>
        )}
      
      </ul>

    </div>
  )
}
