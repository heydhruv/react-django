import { useState, useEffect } from "react"
import api from '../api'
import Note from "../components/Note"
import '../styles/home.css'
export default function Home() {
    const [notes, setNotes] = useState([])
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    useEffect(() => {
        getNotes()
    }, [])

    const getNotes = () => {
        api.get("/api/notes/")
        .then((res) => res.data)
        .then((data) => {
                setNotes(data);
                console.log(data);
            }
        )
        .catch((error) => console.error(error))
    }

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}`)
        .then((res) => {
            if (res.status === 204) {
                alert("Note Deleted")
                getNotes()
            }
            else console.error(res.statusText);
        })
        .catch((error) => console.error(error))
    }

    const createNote = (e) => {
        e.preventDefault();
        api.post("/api/notes/", {content, title})
        .then((res) => {
            if  (res.status !== 201) {
                alert("Note Creation Failed")
            }
        })
        .catch((error)  => console.log(error))
        getNotes()
    }
    return (
    <>
        <div>
            <h2>Notes</h2>
            {notes.map((note) => <Note note={note} onDelete={deleteNote} key={note.id} />)}
        </div>
        <h2>Create Note</h2>
        <form onSubmit={createNote}>
            <label htmlFor="title">Title:</label><br />
            <input type="text" id="title" name="title" required onChange={(e) => setTitle(e.target.value)} value={title} />
            <br />
            <label htmlFor="content">Content:</label><br />
            <textarea name="content" id="content" required value={content} onChange={(e) => setContent(e.target.value)} />
            <br />
            <input type="submit" value="Submit" />
        </form>
    </>
)}