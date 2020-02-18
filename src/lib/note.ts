// 新しい空のメモを返す
function newNote(currentNotes: Note[]): Note {
  const maxId = currentNotes.reduce((a, n) => (a < n.id ? n.id : a), 0);
  return { id: maxId + 1, x: null };
}

// TODO: algorithm
// id に従属するメモの色を返す
function noteColor(id: number): string {
  const Colors: string[] = ["blue","red","yellow","green","greenyellow","orange","pink","purple","aqua"]; 
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

//テキストエリアの自動リサイズ
function noteTextsize(e: React.ChangeEvent<HTMLTextAreaElement>){
  //default
  const padding :number = 2;
  const lineHeight :number = 13;
  e.target.style.overflow = "hidden";

  if(e.target.scrollHeight > e.target.offsetHeight){
    e.target.style.height = (e.target.scrollHeight - (padding*2)) +"px";
  }else{
    const height :number = e.target.scrollHeight - lineHeight;
    e.target.style.height = (height - (padding*2)) + "px";
    noteTextsize(e);
  }
}

export { newNote, noteColor, noteNumber, noteTextsize };
