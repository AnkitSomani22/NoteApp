// src/components/Sidebar.js

import SideBarNote from './SideBarNote';
import * as api from '../api/NotesApi'
import './SideBar.css';

function Sidebar({ 
  notes, 
  activeNoteId, 
  setActiveNoteId, 
}) {
  const handleCreateNote = () => {
      api.createNote()
        .then(newNote => {
          setActiveNoteId(newNote.id)
        })
    }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Notes</h2>
        <button onClick={handleCreateNote} className="new-note-btn">
          +
        </button>
      </div>
      <div className="sidebar-list">
        {notes.length === 0 && (
          <div className="sidebar-empty">No notes yet.</div>
        )}
        {notes.map(note => (
          <SideBarNote
            key={note.id}
            note={note}
            isActive={note.id === activeNoteId}
            onClick={() => setActiveNoteId(note.id)} 
          />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;