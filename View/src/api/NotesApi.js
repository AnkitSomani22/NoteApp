const API_BASE = '/api/notes'

export async function fetchNoteList() {
  const res = await fetch(API_BASE)
  if (!res.ok) {
    await handleApiError(res)
  }
  return res.json()
}

export async function fetchNoteById(id) {
   const res = await fetch(`${API_BASE}/${id}`)
  if (!res.ok) {
    await handleApiError(res)
  }
  return res.json()
}

export async function createNote(payload = { title: 'New Note', content: '', priority: 2 }) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!res.ok) {
    await handleApiError(res)
  }
  return res.json()
}

export async function updateNoteContent(id, payload = { content: '' }) {
  const res = await fetch(`${API_BASE}/${id}/content`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!res.ok) {
    await handleApiError(res)
  }
  return res.json()
}

export async function updateNoteMetadata(id, payload = { title: '', priority: 2 }) {
  const res = await fetch(`${API_BASE}/${id}/metadata`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!res.ok) {
    await handleApiError(res)
  }
  return res.json()
}

export async function deleteNote(id) {
  const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
  if (!res.ok) {
    await handleApiError(res)
  }
  return;
}

async function handleApiError(res) {
  console.error('API Error:', res.status)
}
