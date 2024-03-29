import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  let host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);
  const [search, setSearch] = useState("");

  // Fetch all notes from the database

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = response.json();
    console.log(json);

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  // Update a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));

    for (const note of newNotes) {
      if (note._id === id) {
        note.title = title;
        note.description = description;
        note.tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  const searchNotes = (term) => {
    setSearch(term);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        deleteNote,
        editNote,
        getNotes,
        search,
        setSearch,
        searchNotes,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
