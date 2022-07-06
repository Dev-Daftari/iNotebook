import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props)=>{
    let host = "http://localhost:5000";
    const notesInitial = [ ]
    
        const [notes, setNotes] = useState(notesInitial)

        // Fetch all notes from the database

        const getNotes = async ()=>{
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: 'GET', 
              
                headers: {
                //   'Content-Type': 'application/json',
                  'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjNDUxNTQ3MTBhYTZmYjBjMzQyM2VmIn0sImlhdCI6MTY1NzAzOTkyNH0.z9aDz2aDEbnvEBlBCuJmT7bFDmUj41Jen3J-KqIFVS0'
                }
              });
              const json = await response.json();
              setNotes(json)
        }
        
        const addNote = async (title, description, tag)=>{
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST', 
              
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjNDUxNTQ3MTBhYTZmYjBjMzQyM2VmIn0sImlhdCI6MTY1NzAzOTkyNH0.z9aDz2aDEbnvEBlBCuJmT7bFDmUj41Jen3J-KqIFVS0'
                },
                body: JSON.stringify({title,description,tag})
              });
            const note = {
                "_id": "62c55a0cwef19fewf255038d9770090",
                "user": "62c45154710aa6fb0c3423ef",
                "title": title,
                "tag": tag,
                "description": description,
                "date": "2022-07-06T09:46:52.267Z",
                "__v": 0
              };
            setNotes(notes.concat(note))
        }
        
        // Delete a note
        const deleteNote = async (id)=>{
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: 'DELETE', 
              
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjNDUxNTQ3MTBhYTZmYjBjMzQyM2VmIn0sImlhdCI6MTY1NzAzOTkyNH0.z9aDz2aDEbnvEBlBCuJmT7bFDmUj41Jen3J-KqIFVS0'
                }
              });
              const json = response.json();


            const newNotes = notes.filter((note)=>{return note._id!==id});
            setNotes(newNotes);
        }
        // Update a note
        const editNote = async (id,title,description,tag)=>{
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: 'PUT', 
              
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjNDUxNTQ3MTBhYTZmYjBjMzQyM2VmIn0sImlhdCI6MTY1NzAzOTkyNH0.z9aDz2aDEbnvEBlBCuJmT7bFDmUj41Jen3J-KqIFVS0'
                },
                body: JSON.stringify({title,description, tag})
              });



            for(const note of notes){
                if(note._id===id){
                    note.title = title;
                    note.description = description;
                    note.tag = tag;
                }
            }
        }



    return(
        <NoteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;