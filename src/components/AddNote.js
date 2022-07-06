import React, { useState, useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
const Addnote = () => {
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const context = useContext(NoteContext);
  const { addNote } = context;
  const handleClick = (event) => {
    event.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title:"", description:"", tag:""})
  };
  const onChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };
  return (
    <div className="container my-3">
      <h1>Add a Note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={note.title}
            minLength = {5}
            required
          />
        </div>
        {/* <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
            />
          </div> */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            value={note.description}
            type="text"
            rows="3"
            minLength = {5}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={note.tag}
          />
        </div>
        <button disabled = {note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default Addnote;
