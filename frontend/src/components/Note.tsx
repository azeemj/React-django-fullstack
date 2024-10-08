import React from "react";
import '../styles/Note.css'

export interface NoteProps{

    note:{
        id: string,
        title: string,
        content: string,
        created_at: string
    };
    onDelete:(id: string) =>void
}

const Note: React.FC<NoteProps> = ({note, onDelete}) =>{

    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    return (
        <div className="note-conatiner">
            <p className="note-title">{note.title}</p>
            <p className="note-content">{note.content}</p>
            <p className="note-date">{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(note.id)}>
                Delete
            </button>
        </div>


    );
}

export default Note;