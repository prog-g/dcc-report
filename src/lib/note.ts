// 新しい空のメモを返す
function newNote(currentNotes: Note[]): Note {
  const maxId = currentNotes.reduce((a, n) => (a < n.id ? n.id : a), 0);
  return { id: maxId + 1, x: null };
}

// TODO: algorithm
// id に従属するメモの色を返す
function noteColor(id: number): string {
  const Colors: string[] = [
    "blue",
    "red",
    "yellow",
    "green",
    "greenyellow",
    "orange",
    "pink",
    "purple",
    "aqua"
  ];
  return Colors[id % Colors.length];
}

// グラフ上の点の番号を求める関数
// グラフと紐づいている Note のみを対象とし、番号は1から与える
function noteNumber(notes: Note[], id: number): number | null {
  const i = notes
    .filter(n => n.x !== null)
    .sort((a, b) => (a.x !== null && b.x !== null ? a.x - b.x : 0))
    .findIndex(n => n.id === id);
  return i >= 0 ? i + 1 : null;
}

//content__dummyにテキストを入れる関数
function flexTextarea(e: React.ChangeEvent<HTMLTextAreaElement>) {
  const dummy = document.querySelector(".content__dummy");
  dummy!.textContent = e.target.value;
}

export { newNote, noteColor, noteNumber, flexTextarea };
