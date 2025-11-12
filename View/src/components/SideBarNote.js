import './SideBarNote.css';

function SideBarNote({ note, isActive, onClick }) {
  const priorityClass = 'priority-' + note.priority;

  return (
    <div
      className={`sidebar-note ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <h4>{note.title}</h4>   
      <div className={`priority-dot ${priorityClass}`}></div>
    </div>
  );
}

export default SideBarNote;