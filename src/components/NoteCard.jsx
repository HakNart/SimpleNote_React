import { useContext } from "react";
import { NoteEditModal } from "./NoteEditModal";
import { NoteContext } from "../pages/Notes";

export default function NoteCard({ note, onEdit}) {
  const className = `card w-full max-w-[420px] mx-auto my-1 bg-base-200 text-base-content`;
  // const {toggleEditOn} = useContext(NoteContext);

  // const handleNoteCardClick = () => {
  //   // setToggleNoteEdit(true);

  //   toggleEditOn(note);
  // }

  return (
    <div className="note-card" onClick={onEdit}>
      <div className={className}>
        <div className="card-body">
          <div className="flex justify-between">
            <h2 className="card-title">{note.title}</h2>
          </div>

          {note.type == "text" && <p>{note.content}</p>}
          {note.type == "checklist" && (
            <ul>
              {note.items.map((item) => (
                <div className="form-control">
                  <label className="label cursor-pointer justify-start">
                    {/* TODO: set onChange behaviror to response to check/uncheck action */}
                    <input
                      type="checkbox"
                      className="checkbox-success checkbox"
                      checked={item.checked}
                    />
                    <span className="label-text pl-1">{item.text}</span>
                  </label>
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
      

    </div>
  );
}


