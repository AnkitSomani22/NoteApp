import { useState, useEffect } from 'react'
import * as api from '../api/NotesApi'
import './Editor.css'

function Editor({ activeNoteId, onNoteChange, setActiveNoteId }) {
  const [activeNote, setActiveNote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [localTitle, setLocalTitle] = useState('')
  const [localContent, setLocalContent] = useState('')

  useEffect(() => {
    if (!activeNoteId) {
      setActiveNote(null);
      return;
    }

    setIsLoading(true);
    api.fetchNoteById(activeNoteId)
      .then(note => {
        setActiveNote(note);
        setLocalContent(note.content || '');
        setLocalTitle(note.title || '');
        setIsLoading(false);
      });
  }, [activeNoteId])


  const handleTitleBlur = async () => {
     if (!activeNote) return
    const originalTitle = activeNote.title || ''
    if (localTitle === originalTitle) return
    await api.updateNoteMetadata(activeNote.id, { title: localTitle, priority: activeNote.priority }).then(() => onNoteChange());
  }

  const handleContentBlur = async () => {
     if (!activeNote) return
    const originalContent = activeNote.content || ''
    if (localContent === originalContent) return
    await api.updateNoteContent(activeNote.id, { content: localContent });
  }

  const handlePriorityChange = (e) => {
    if (!activeNote) return
    const newPriority = parseInt(e.target.value)
    api.updateNoteMetadata(activeNote.id, { title: localTitle || activeNote.title, priority: newPriority })
      .then(() => onNoteChange())
  }

  const handleDeleteNote = () => {
    if (!activeNote) return
    api.deleteNote(activeNote.id)
        .then(() => setActiveNoteId(null))
  }

  if (isLoading) {
    return <div className="empty">Loading..</div>
  }

  if (!activeNote) {
    return <div className="empty">Select a note to edit</div>
  }

  return (
    <div className="editor">
      <div className="header">
        <select
          name="priority"
          value={activeNote.priority}
          onChange={handlePriorityChange}
          className="priority"
        >
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </select>
        <button 
          onClick={handleDeleteNote} 
          className="delete"
        >
          Delete
        </button>
      </div>

      <input
        name='title'
        type="text"
        value={localTitle}
        onChange={(e) => setLocalTitle(e.target.value)}
        onBlur={handleTitleBlur}
        className="title"
        placeholder="Note Title"
      />
      
      <textarea
        name='content'
        value={localContent}
        onChange={(e) => setLocalContent(e.target.value)}
        onBlur={handleContentBlur}
        className="content"
        placeholder="Start writing..."
      />
    </div>
  )
}

export default Editor