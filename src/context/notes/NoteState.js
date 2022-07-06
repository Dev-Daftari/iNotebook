import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const notesInitial = 
        [
            {
              "_id": "62c510f11b7816439c2fcda8",
              "user": "62c45154710aa6fb0c3423ef",
              "title": "My First Note",
              "tag": "personal",
              "description": "This is my first note in iNotebook",
              "date": "2022-07-06T04:34:57.204Z",
              "__v": 0
            }
          ]
    
        const [notes, setNotes] = useState(notesInitial)
    
    return(
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;