import react from 'react'
import '../styles/note.css'
export default function Note({note, onDelete}) {

    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")
    return (
    <div>
        <p className="note-title">{note.title}</p>
        <p className="note-content">{note.content}</p>
        <p className="note-data">{formattedDate}</p>
        <button className='delete-button' onClick={() => onDelete(note.id)}>
            Delete
        </button>
    </div>
)
}