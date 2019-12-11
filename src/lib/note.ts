function newNote(currentNotes: NoteState[]): NoteState {
  const maxId = currentNotes.reduce((a, n) => (a < n.id ? n.id : a), 0);
  return { id: maxId + 1 };
}

function appendNewNote(setNotes: SetNotesFunc): void {
  setNotes(prev => [...prev, newNote(prev)]);
}

function insertNewNoteBefore(setNotes: SetNotesFunc, id: number): void {
  setNotes(prev => {
    const i = prev.findIndex(n => n.id === id);
    return [...prev.slice(0, i), newNote(prev), ...prev.slice(i, prev.length)];
  });
}

export { appendNewNote, insertNewNoteBefore };
