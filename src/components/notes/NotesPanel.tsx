import { Task } from "@/types/index";
import AddNoteForm from "./AddNoteForm";
import NoteDetails from "./NoteDetails";

type NotesPanelProps = {
    notes: Task['notes']
}

export default function NotesPanel({notes} : NotesPanelProps) {
  return (
    <>
        <AddNoteForm/>
        <div className=" divide-y divide-gray-100 mt-5">
            {notes.length ? (
                <>
                    <p className=" text-base font-semibold text-slate-600">Notas: </p>
                    {notes.map(note => <NoteDetails key={note.idNote} note={note}/>) }
                </>
            ) : <p className=" text-gray-500 text-center pt-3">No hay notas</p>}
        </div>
        
    </>
  )
}
