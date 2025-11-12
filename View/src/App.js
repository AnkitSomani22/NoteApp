import React, { useState, useEffect, useMemo } from 'react'
import SideBar from './components/SideBar'
import Editor from './components/Editor'
import * as api from './api/NotesApi'
import './App.css'

function App() {
  const [notesList, setNotesList] = useState([])
  const [activeNoteId, setActiveNoteId] = useState(null)

  const fetchList = () => {
    api.fetchNoteList().then(list => {
      setNotesList(list);
    });
  };

  useEffect(() => {
    fetchList();
  }, [activeNoteId]);


  const sortedNotesList = useMemo(() => {
    return [...notesList].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  }, [notesList])

  return (
    <div className="container">
      <SideBar notes={sortedNotesList} activeNoteId={activeNoteId} setActiveNoteId={setActiveNoteId} />
      <Editor key={activeNoteId} activeNoteId={activeNoteId} onNoteChange={fetchList} setActiveNoteId={setActiveNoteId} />
    </div>
  )
}

export default App