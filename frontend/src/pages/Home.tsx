import { useState, useEffect } from "react"
import api from "../api"
import Note from "../components/Note"
import {NoteProps} from "../components/Note"
import "../styles/Home.css"
// define the Note type 
type NoteType = NoteProps['note'];


function Home(){
    const [notes, setNotes] = useState<NoteType[]>([]); 
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    useEffect(()=>{
        getNotes();
    },[])

    const getNotes = () => {

        api.get("api/notes/")
            .then((res) => {
                return res.data

            }).then((data) => {
                setNotes(data);
                console.log(data)
            }).

            catch((error) => {
                alert(error)
            })

    }

    const deleteNote = (id :string) => {
        api.delete(`api/notes/delete/${id}/`)
            .then((res)=>{

                if(res.status === 204)alert("it is deleted sucessfully")
                else alert("it is failed to delete");
                getNotes();
            }


            )
            .catch((error)=> alert(error))
    }

    const createNote = (e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
            api.post("api/notes/",{content, title})
                .then((res) => res.data)
                .then((data)=>{

                    if(data.status === 201){
                        alert("sucessfully created");
                    }else{
                        alert("Failed to create!")
                    }
                })
                .catch((error) => alert(error))
    }

    return (
        

        <div>
            <h2>Notes</h2>
            {notes.map((note)=>(
            <Note note = {note}
                    onDelete={deleteNote} 
                    key={note.id} ></Note>
            ))

            }
      
        <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    
    );
}

export default Home